import { LocalisationToValidate, Typologie } from '../../models';
import { memeCommune } from '../commune';
import { distanceEnMetres } from '../distance';
import { libelleSansIdentite, normaliserAdresse, normaliserNom } from '../normalisation';
import { similarite } from '../similarite';
import { typologiesDepuisNom } from '../typologies-depuis-nom';

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
  allowInternalMerge?: boolean;
};

const typologiesCompatibles: readonly (readonly [Typologie, Typologie])[] = [[Typologie.RFS, Typologie.PIMMS]];

const typologiesDe = ({ typologies, nom }: LieuAComparer): Typologie[] =>
  typologies == null || typologies.length === 0 ? typologiesDepuisNom(nom) : typologies;

const seRecoupent = (unes: Typologie[], autres: Typologie[]): boolean =>
  unes.some((typologie: Typologie): boolean => autres.includes(typologie));

const compatiblesParEquivalence = (unes: Typologie[], autres: Typologie[]): boolean =>
  typologiesCompatibles.some(
    ([une, autre]: readonly [Typologie, Typologie]): boolean =>
      (unes.includes(une) && autres.includes(autre)) || (unes.includes(autre) && autres.includes(une))
  );

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

const scoreDistance = (metres: number): number =>
  metres <= MEME_EMPLACEMENT_EN_METRES ? 100 : Math.round((100 * MEME_EMPLACEMENT_EN_METRES) / metres);

const distanceDe = (un: LieuAComparer, autre: LieuAComparer): number | undefined =>
  un.localisation == null || autre.localisation == null ? undefined : distanceEnMetres(un.localisation, autre.localisation);

const scoreAdresse = (un: LieuAComparer, autre: LieuAComparer): number | undefined =>
  libelleSansIdentite(un.adresse) || libelleSansIdentite(autre.adresse)
    ? undefined
    : similarite(normaliserAdresse(un.adresse), normaliserAdresse(autre.adresse));

type Composante = { readonly valeur: number | undefined; readonly poids: number };

type ComposanteMesuree = { readonly valeur: number; readonly poids: number };

const estMesuree = (composante: Composante): composante is ComposanteMesuree => composante.valeur != null;

const moyennePonderee = (composantes: readonly Composante[]): number =>
  ((mesurees: readonly ComposanteMesuree[]): number =>
    mesurees.length === 0
      ? 0
      : Math.round(
          mesurees.reduce((total: number, { valeur, poids }: ComposanteMesuree): number => total + valeur * poids, 0) /
            mesurees.reduce((total: number, { poids }: ComposanteMesuree): number => total + poids, 0)
        ))(composantes.filter(estMesuree));

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
    score: moyennePonderee([
      { valeur: scoreNom, poids: 2 },
      { valeur: adresse, poids: 1 },
      { valeur: distance == null ? undefined : scoreDistance(distance), poids: 1 }
    ])
  }))(similarite(normaliserNom(un.nom), normaliserNom(autre.nom)), scoreAdresse(un, autre), distanceDe(un, autre));
