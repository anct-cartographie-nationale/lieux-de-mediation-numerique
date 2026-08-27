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

/** Dénomination ramenée à sa forme comparable, préfixes administratifs canonisés. */
export const normaliserNom = (nom: string): string =>
  prefixesEquivalents
    .reduce(
      (normalise: string, [prefixe, canonique]: readonly [RegExp, string]): string => normalise.replace(prefixe, canonique),
      sansAccentsNiPonctuation(nom)
    )
    .trim();
