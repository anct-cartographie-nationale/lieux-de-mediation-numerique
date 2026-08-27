import { LocalisationToValidate, Typologie } from '../../models';
import { memeCommune } from '../commune';
import { distanceEnMetres } from '../distance';
import { libelleSansIdentite, normaliserAdresse, normaliserNom } from '../normalisation';
import { similarite } from '../similarite';
import { typologiesDepuisNom } from '../typologies-depuis-nom';

/**
 * Comparaison de deux lieux de médiation numérique, pour décider s'ils n'en font
 * qu'un.
 *
 * Le jugement se sépare en deux, et c'est délibéré :
 *
 * - les VETOS sont catégoriques. Ils écartent la paire quelle que soit sa
 *   ressemblance par ailleurs, et aucun consommateur ne doit fusionner une paire
 *   qui en porte un. Sans eux, la moyenne des scores noie une distinction nette :
 *   « EPN de Fleury » et « Commune de Fleury » partagent l'adresse, les
 *   coordonnées et une bonne part du nom.
 * - les SCORES sont gradués, et chacun y pose le seuil que son usage demande.
 *   Une fusion automatique se tient haut, une détection de doublons soumise à
 *   arbitrage humain se tient bas.
 *
 * Une composante indisponible — coordonnées manquantes, adresse non diffusible —
 * est ABSENTE du résultat, et non ramenée à zéro ni à cent : ne rien savoir n'est
 * ni une ressemblance ni une différence. La moyenne ne porte donc que sur ce
 * qu'on a pu mesurer.
 *
 * Encore faut-il qu'il reste quelque chose. Un lieu est un ENDROIT : si ni
 * l'adresse ni la distance ne sont comparables, plus rien ne le situe, et la
 * dénomination seule ne suffit pas — une commune compte plusieurs « Association
 * Trait d'Union ». D'où le veto `sans-emplacement`, sans lequel deux fiches non
 * diffusibles et dépourvues de coordonnées obtiendraient un score parfait.
 */

/** Distance en deçà de laquelle deux points sont le même endroit : la largeur d'une parcelle. */
const MEME_EMPLACEMENT_EN_METRES: 50 = 50 as const;

export type LieuAComparer = {
  nom: string;
  adresse: string;
  codeInsee?: string | null;
  localisation?: LocalisationToValidate | null;
  typologies?: Typologie[] | null;
  source?: string | null;
};

export type Veto = 'sans-identite' | 'sans-emplacement' | 'commune-differente' | 'typologies-incompatibles' | 'meme-source';

export type Comparaison = {
  vetos: Veto[];
  nom: number;
  adresse?: number;
  distance?: number;
  score: number;
};

export type OptionsComparaison = {
  /**
   * Autorise le rapprochement de deux lieux d'une même source. Une source est
   * réputée responsable de son propre dédoublonnage, d'où le refus par défaut —
   * mais un consommateur qui n'a qu'une source, comme une base applicative, doit
   * l'activer sous peine de ne jamais rien rapprocher.
   */
  allowInternalMerge?: boolean;
};

/**
 * Typologies qui ne se contredisent pas malgré leur libellé : un point
 * d'information médiation multi-services EST un relais France services.
 */
const typologiesCompatibles: readonly (readonly [Typologie, Typologie])[] = [[Typologie.RFS, Typologie.PIMMS]];

/** La typologie déclarée fait foi ; à défaut, celle que la dénomination laisse reconnaître. */
const typologiesDe = ({ typologies, nom }: LieuAComparer): Typologie[] =>
  typologies == null || typologies.length === 0 ? typologiesDepuisNom(nom) : typologies;

const seRecoupent = (unes: Typologie[], autres: Typologie[]): boolean =>
  unes.some((typologie: Typologie): boolean => autres.includes(typologie));

const compatiblesParEquivalence = (unes: Typologie[], autres: Typologie[]): boolean =>
  typologiesCompatibles.some(
    ([une, autre]: readonly [Typologie, Typologie]): boolean =>
      (unes.includes(une) && autres.includes(autre)) || (unes.includes(autre) && autres.includes(une))
  );

/**
 * Une typologie absente des deux côtés — que le nom n'a pas permis de déduire —
 * laisse la paire compatible : on ne sait pas, et l'ignorance ne tranche pas.
 */
const typologiesIncompatibles = (un: LieuAComparer, autre: LieuAComparer): boolean =>
  ((unes: Typologie[], autres: Typologie[]): boolean =>
    unes.length !== 0 && autres.length !== 0 && !seRecoupent(unes, autres) && !compatiblesParEquivalence(unes, autres))(
    typologiesDe(un),
    typologiesDe(autre)
  );

const sansIdentite = (un: LieuAComparer, autre: LieuAComparer): boolean =>
  libelleSansIdentite(un.nom) || libelleSansIdentite(autre.nom);

const memeSource = (un: LieuAComparer, autre: LieuAComparer, allowInternalMerge: boolean): boolean =>
  !allowInternalMerge && un.source != null && un.source === autre.source;

/** Rien ne situe la paire : ni adresse comparable, ni distance mesurable. */
const sansEmplacement = (adresse: number | undefined, distance: number | undefined): boolean =>
  adresse == null && distance == null;

const vetosDe = (
  un: LieuAComparer,
  autre: LieuAComparer,
  allowInternalMerge: boolean,
  adresse: number | undefined,
  distance: number | undefined
): Veto[] => [
  ...(sansIdentite(un, autre) ? (['sans-identite'] as const) : []),
  ...(sansEmplacement(adresse, distance) ? (['sans-emplacement'] as const) : []),
  ...(memeCommune(un.codeInsee, autre.codeInsee) ? [] : (['commune-differente'] as const)),
  ...(typologiesIncompatibles(un, autre) ? (['typologies-incompatibles'] as const) : []),
  ...(memeSource(un, autre, allowInternalMerge) ? (['meme-source'] as const) : [])
];

/** Score de proximité : entier au-delà du seuil, décroissant ensuite. */
const scoreDistance = (metres: number): number =>
  metres <= MEME_EMPLACEMENT_EN_METRES ? 100 : Math.round((100 * MEME_EMPLACEMENT_EN_METRES) / metres);

const distanceDe = (un: LieuAComparer, autre: LieuAComparer): number | undefined =>
  un.localisation == null || autre.localisation == null ? undefined : distanceEnMetres(un.localisation, autre.localisation);

/** Une adresse qui ne désigne rien ne se compare pas : deux « [Non diffusible] » ne sont pas la même voie. */
const scoreAdresse = (un: LieuAComparer, autre: LieuAComparer): number | undefined =>
  libelleSansIdentite(un.adresse) || libelleSansIdentite(autre.adresse)
    ? undefined
    : similarite(normaliserAdresse(un.adresse), normaliserAdresse(autre.adresse));

const moyenne = (composantes: (number | undefined)[]): number =>
  ((mesurees: number[]): number =>
    mesurees.length === 0
      ? 0
      : Math.round(mesurees.reduce((total: number, composante: number): number => total + composante, 0) / mesurees.length))(
    composantes.filter((composante: number | undefined): composante is number => composante != null)
  );

export const comparer = (
  un: LieuAComparer,
  autre: LieuAComparer,
  { allowInternalMerge = false }: OptionsComparaison = {}
): Comparaison =>
  ((scoreNom: number, adresse: number | undefined, distance: number | undefined): Comparaison => ({
    vetos: vetosDe(un, autre, allowInternalMerge, adresse, distance),
    nom: scoreNom,
    ...(adresse == null ? {} : { adresse }),
    ...(distance == null ? {} : { distance }),
    score: moyenne([scoreNom, adresse, distance == null ? undefined : scoreDistance(distance)])
  }))(similarite(normaliserNom(un.nom), normaliserNom(autre.nom)), scoreAdresse(un, autre), distanceDe(un, autre));
