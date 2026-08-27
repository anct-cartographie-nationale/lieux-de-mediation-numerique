/**
 * Formes comparables d'une dénomination et d'une adresse.
 *
 * Une même structure ne porte pas le même libellé selon la source qui la
 * décrit : la saisie d'un utilisateur, la dénomination normalisée de la
 * cartographie, la raison sociale de l'annuaire des entreprises.
 * « MAIRIE DU PRÊCHEUR », « Commune du Precheur » et « Ville du Prêcheur »
 * désignent le même lieu — les comparer tels quels les sépare.
 *
 * La normalisation précède donc la mesure de ressemblance : elle relève le score
 * là où la différence n'est qu'une écriture, sans rien décider elle-même.
 */

const sansAccentsNiPonctuation = (libelle: string): string =>
  libelle
    .toLowerCase()
    .normalize('NFD')
    // Diacritiques combinantes détachées par NFD.
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Préfixes administratifs interchangeables, ramenés à un jeton canonique :
 * « commune de X », « mairie de X », « ville de X » et « hôtel de ville de X »
 * désignent la même entité.
 */
const prefixesEquivalents: readonly (readonly [RegExp, string])[] = [
  [/^commune (?:de(?:s)?|du|de la|de l)\s+/, 'ville '],
  [/^com (?:de(?:s)?|du|de la|de l)\s+/, 'ville '],
  [/^mairie (?:de(?:s)?|du|de la|de l)\s+/, 'ville '],
  [/^ville (?:de(?:s)?|du|de la|de l)\s+/, 'ville '],
  [/^hotel de ville (?:de(?:s)?|du|de la|de l)\s+/, 'ville '],
  [/^conseil departemental (?:de(?:s)?|du|de la|de l)\s+/, 'departement '],
  [/^departement (?:de(?:s)?|du|de la|de l)\s+/, 'departement '],
  [/^communaute de communes?\s+/, 'cc '],
  [/^communaute d agglomeration\s+/, 'cagglo '],
  [/^communaute com\s+/, 'cc '],
  [/^conseil regional (?:de(?:s)?|du|de la|de l)\s+/, 'region '],
  [/^region\s+/, 'region ']
];

/**
 * Libellés qui tiennent la place d'une information absente. L'INSEE rend
 * « [Non diffusible] » pour les établissements qui refusent la diffusion de
 * leurs données — nom comme adresse. Ce n'est pas une identité : deux
 * établissements non diffusibles ne sont pas le même, et les rapprocher les
 * fusionnerait tous.
 */
const libellesSansIdentite: readonly RegExp[] = [/^non diffusible/, /^non communique/, /^inconnu/];

/**
 * Vrai quand le libellé ne désigne rien : vide, ou marqueur d'absence. Un tel
 * libellé ne peut ni rapprocher deux lieux ni les distinguer.
 */
export const libelleSansIdentite = (libelle: string): boolean =>
  ((normalise: string): boolean =>
    normalise === '' || libellesSansIdentite.some((absent: RegExp): boolean => absent.test(normalise)))(
    sansAccentsNiPonctuation(libelle)
  );

/**
 * Adresse ramenée à sa forme comparable : casse, accents et ponctuation ne
 * distinguent pas deux libellés de la même voie.
 */
export const normaliserAdresse = (adresse: string): string => sansAccentsNiPonctuation(adresse);

/**
 * Abréviations courantes, ramenées à leur forme longue.
 *
 * Elles échappent à toute mesure de ressemblance : « st » et « saint » ne
 * partagent que deux caractères sur sept, soit 57 % — bien en deçà de tout seuil
 * utile. Seule une table explicite les rapproche.
 *
 * Relevé sur les 12 477 dénominations de la Coop de la médiation numérique :
 * « st » y paraît 168 fois contre 619 pour « saint », « ctre » 54 fois contre
 * 871 pour « centre ».
 */
const abreviations: ReadonlyMap<string, string> = new Map([
  ['st', 'saint'],
  ['ste', 'sainte'],
  ['sts', 'saints'],
  ['ctre', 'centre'],
  ['ass', 'association'],
  ['asso', 'association']
]);

/**
 * Désinflexions : pluriels et accords, ramenés à une forme unique.
 *
 * C'est la variation de loin la plus fréquente dans les dénominations réelles —
 * « social » y côtoie « sociale » et « sociales », « atelier » côtoie
 * « ateliers ». Les énumérer une à une serait sans fin ; ces quelques règles les
 * couvrent toutes.
 *
 * Volontairement conservatrices : pas de troncature de voyelle finale, qui
 * confondrait des mots distincts et abaisserait le pouvoir de discrimination du
 * score. « Communal » reste donc distinct de « commune », ce qui est correct.
 */
const desinflexions: readonly (readonly [RegExp, string])[] = [
  [/iaux$/, 'ial'],
  [/aux$/, 'al'],
  [/ales$/, 'al'],
  [/elles$/, 'el'],
  [/ale$/, 'al'],
  [/elle$/, 'el'],
  [/([^s])s$/, '$1']
];

/** En deçà de cette longueur, un terme est trop court pour qu'on lui retire quoi que ce soit. */
const LONGUEUR_MINIMALE_DESINFLEXION: 5 = 5 as const;

/** La première règle qui s'applique suffit : les suffixes sont ordonnés du plus long au plus court. */
const desinflechir = (terme: string): string =>
  terme.length < LONGUEUR_MINIMALE_DESINFLEXION
    ? terme
    : ((regle: readonly [RegExp, string] | undefined): string => (regle == null ? terme : terme.replace(regle[0], regle[1])))(
        desinflexions.find(([suffixe]: readonly [RegExp, string]): boolean => suffixe.test(terme))
      );

const canoniserTerme = (terme: string): string => desinflechir(abreviations.get(terme) ?? terme);

/**
 * Dénomination ramenée à sa forme comparable : préfixes administratifs
 * canonisés, puis chaque terme désabrégé et désinfléchi.
 */
export const normaliserNom = (nom: string): string =>
  prefixesEquivalents
    .reduce(
      (normalise: string, [prefixe, canonique]: readonly [RegExp, string]): string => normalise.replace(prefixe, canonique),
      sansAccentsNiPonctuation(nom)
    )
    .trim()
    .split(' ')
    .map(canoniserTerme)
    .join(' ');
