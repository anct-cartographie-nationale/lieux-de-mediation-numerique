const sansAccentsNiPonctuation = (libelle: string): string =>
  libelle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

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

const libellesSansIdentite: readonly RegExp[] = [/^non diffusible/, /^non communique/, /^inconnu/];

export const libelleSansIdentite = (libelle: string): boolean =>
  ((normalise: string): boolean =>
    normalise === '' || libellesSansIdentite.some((absent: RegExp): boolean => absent.test(normalise)))(
    sansAccentsNiPonctuation(libelle)
  );

export const normaliserAdresse = (adresse: string): string => sansAccentsNiPonctuation(adresse);

const abreviations: ReadonlyMap<string, string> = new Map([
  ['st', 'saint'],
  ['ste', 'sainte'],
  ['sts', 'saints'],
  ['ctre', 'centre'],
  ['ass', 'association'],
  ['asso', 'association']
]);

const desinflexions: readonly (readonly [RegExp, string])[] = [
  [/iaux$/, 'ial'],
  [/aux$/, 'al'],
  [/ales$/, 'al'],
  [/elles$/, 'el'],
  [/ale$/, 'al'],
  [/elle$/, 'el'],
  [/([^s])s$/, '$1']
];

const LONGUEUR_MINIMALE_DESINFLEXION: 5 = 5 as const;

const desinflechir = (terme: string): string =>
  terme.length < LONGUEUR_MINIMALE_DESINFLEXION
    ? terme
    : ((regle: readonly [RegExp, string] | undefined): string => (regle == null ? terme : terme.replace(regle[0], regle[1])))(
        desinflexions.find(([suffixe]: readonly [RegExp, string]): boolean => suffixe.test(terme))
      );

const canoniserTerme = (terme: string): string => desinflechir(abreviations.get(terme) ?? terme);

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
