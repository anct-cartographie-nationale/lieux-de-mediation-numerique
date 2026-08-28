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

export type LieuPrepare = {
  readonly nom: string;
  readonly adresse: string | null;
  readonly sansIdentite: boolean;
  readonly codeInsee: string | null;
  readonly localisation: LocalisationToValidate | null;
  readonly typologies: readonly Typologie[];
  readonly source: string | null;
};

export type Veto = 'sans-identite' | 'sans-emplacement' | 'commune-differente' | 'typologies-incompatibles' | 'meme-source';

export type ComparaisonRejetee = {
  readonly vetos: readonly [Veto, ...Veto[]];
};

export type ComparaisonMesuree = {
  readonly vetos: readonly [];
  readonly nom: number;
  readonly adresse?: number;
  readonly distance?: number;
  readonly score: number;
};

export type Comparaison = ComparaisonRejetee | ComparaisonMesuree;

export type OptionsComparaison = {
  allowInternalMerge?: boolean;
};

const typologiesDe = ({ typologies, nom }: LieuAComparer): readonly Typologie[] =>
  typologies == null || typologies.length === 0 ? typologiesDepuisNom(nom) : typologies;

export const preparer = (lieu: LieuAComparer): LieuPrepare => ({
  nom: normaliserNom(lieu.nom),
  adresse: libelleSansIdentite(lieu.adresse) ? null : normaliserAdresse(lieu.adresse),
  sansIdentite: libelleSansIdentite(lieu.nom),
  codeInsee: lieu.codeInsee ?? null,
  localisation: lieu.localisation ?? null,
  typologies: typologiesDe(lieu),
  source: lieu.source ?? null
});

const typologiesCompatibles: readonly (readonly [Typologie, Typologie])[] = [[Typologie.RFS, Typologie.PIMMS]];

const seRecoupent = (unes: readonly Typologie[], autres: readonly Typologie[]): boolean =>
  unes.some((typologie: Typologie): boolean => autres.includes(typologie));

const compatiblesParEquivalence = (unes: readonly Typologie[], autres: readonly Typologie[]): boolean =>
  typologiesCompatibles.some(
    ([une, autre]: readonly [Typologie, Typologie]): boolean =>
      (unes.includes(une) && autres.includes(autre)) || (unes.includes(autre) && autres.includes(une))
  );

const typologiesIncompatibles = ({ typologies: unes }: LieuPrepare, { typologies: autres }: LieuPrepare): boolean =>
  unes.length !== 0 && autres.length !== 0 && !seRecoupent(unes, autres) && !compatiblesParEquivalence(unes, autres);

const memeSource = (un: LieuPrepare, autre: LieuPrepare, allowInternalMerge: boolean): boolean =>
  !allowInternalMerge && un.source != null && un.source === autre.source;

const sansEmplacement = (un: LieuPrepare, autre: LieuPrepare): boolean =>
  (un.adresse == null || autre.adresse == null) && (un.localisation == null || autre.localisation == null);

const vetosDe = (un: LieuPrepare, autre: LieuPrepare, allowInternalMerge: boolean): Veto[] => [
  ...(un.sansIdentite || autre.sansIdentite ? (['sans-identite'] as const) : []),
  ...(sansEmplacement(un, autre) ? (['sans-emplacement'] as const) : []),
  ...(memeCommune(un.codeInsee, autre.codeInsee) ? [] : (['commune-differente'] as const)),
  ...(typologiesIncompatibles(un, autre) ? (['typologies-incompatibles'] as const) : []),
  ...(memeSource(un, autre, allowInternalMerge) ? (['meme-source'] as const) : [])
];

const scoreDistance = (metres: number): number =>
  metres <= MEME_EMPLACEMENT_EN_METRES ? 100 : Math.round((100 * MEME_EMPLACEMENT_EN_METRES) / metres);

const distanceDe = (un: LieuPrepare, autre: LieuPrepare): number | undefined =>
  un.localisation == null || autre.localisation == null ? undefined : distanceEnMetres(un.localisation, autre.localisation);

const scoreAdresse = (un: LieuPrepare, autre: LieuPrepare): number | undefined =>
  un.adresse == null || autre.adresse == null ? undefined : similarite(un.adresse, autre.adresse);

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

const mesurer = (un: LieuPrepare, autre: LieuPrepare): ComparaisonMesuree =>
  ((scoreNom: number, adresse: number | undefined, distance: number | undefined): ComparaisonMesuree => ({
    vetos: [],
    nom: scoreNom,
    ...(adresse == null ? {} : { adresse }),
    ...(distance == null ? {} : { distance }),
    score: moyennePonderee([
      { valeur: scoreNom, poids: 2 },
      { valeur: adresse, poids: 1 },
      { valeur: distance == null ? undefined : scoreDistance(distance), poids: 1 }
    ])
  }))(similarite(un.nom, autre.nom), scoreAdresse(un, autre), distanceDe(un, autre));

export const comparer = (
  un: LieuPrepare,
  autre: LieuPrepare,
  { allowInternalMerge = false }: OptionsComparaison = {}
): Comparaison =>
  ((vetos: Veto[]): Comparaison => (vetos[0] == null ? mesurer(un, autre) : { vetos: [vetos[0], ...vetos.slice(1)] }))(
    vetosDe(un, autre, allowInternalMerge)
  );
