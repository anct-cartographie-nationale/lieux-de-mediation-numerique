import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js';
import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const DETAILS_ENTRE_PARENTHESES: RegleDeNettoyage = {
  nom: 'détails entre parenthèses en fin de numéro',
  selecteur: /\s\(.*\)$/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s\(.*\)$/gu, '')
};

const DETAILS_EN_TETE: RegleDeNettoyage = {
  nom: 'détails en tête de numéro',
  selecteur: /^\D{3,}/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^\D{3,}/gu, '')
};

const DETAILS_EN_QUEUE: RegleDeNettoyage = {
  nom: 'détails en queue de numéro',
  selecteur: /\s[A-Za-z].*$/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s[A-Za-z].*$/gu, '')
};

const LISTE_PAR_BARRE_OBLIQUE: RegleDeNettoyage = {
  nom: 'liste de numéros séparés par une barre oblique',
  selecteur: /\d{10}\/\/?\d{10}/u,
  corriger: (aCorriger: string): string => aCorriger.split('/')[0] ?? ''
};

const PREMIER_D_UNE_LISTE: RegleDeNettoyage = {
  nom: 'premier numéro d une liste sur plusieurs lignes',
  selecteur: /\n/u,
  corriger: (aCorriger: string): string => /^(?<telephone>[^\n]+)/u.exec(aCorriger)?.groups?.['telephone'] ?? ''
};

const CARACTERES_PARASITES: RegleDeNettoyage = {
  nom: 'caractères parasites',
  selecteur: /(?!\w|\+)./u,
  corriger: (aCorriger: string): string => aCorriger.replace(/(?!\w|\+)./gu, '')
};

const PLUS_MANQUANT: RegleDeNettoyage = {
  nom: 'plus manquant devant un indicatif',
  selecteur: /^(33|262|590|594|596)(\d+)/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^(33|262|590|594|596)(\d+)/u, '+$1$2')
};

const ZERO_APRES_LE_PLUS: RegleDeNettoyage = {
  nom: 'zéro national conservé après le plus',
  selecteur: /^\+0(\d{9})/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^\+0(\d{9})/u, '+33$1')
};

const NUMERO_COURT_CAF: RegleDeNettoyage = {
  nom: 'numéro court de la CAF',
  selecteur: /3230/u,
  corriger: (): string => '+33969322121'
};

const NUMERO_COURT_ASSURANCE_RETRAITE: RegleDeNettoyage = {
  nom: 'numéro court de l Assurance retraite',
  selecteur: /3960/u,
  corriger: (): string => '+33971103960'
};

const indicatifSelonLeCodePostal = (codePostal?: string): string => {
  switch (codePostal?.slice(0, 3)) {
    case '971':
      return '+590';
    case '972':
      return '+596';
    case '973':
      return '+594';
    case '974':
      return '+262';
    default:
      return '+33';
  }
};

export const zeroInitialPerdu = (codePostal?: string): RegleDeNettoyage => ({
  nom: 'zéro initial perdu',
  selecteur: /^[1-9]\d{8}$/u,
  corriger: (aCorriger: string): string => `${indicatifSelonLeCodePostal(codePostal)}${aCorriger}`
});

const REGLES_COMMUNES: readonly RegleDeNettoyage[] = [
  PREMIER_D_UNE_LISTE,
  LISTE_PAR_BARRE_OBLIQUE,
  DETAILS_ENTRE_PARENTHESES,
  DETAILS_EN_TETE,
  DETAILS_EN_QUEUE,
  NUMERO_COURT_CAF,
  NUMERO_COURT_ASSURANCE_RETRAITE,
  CARACTERES_PARASITES,
  PLUS_MANQUANT,
  ZERO_APRES_LE_PLUS
];

export const reglesTelephone = (codePostal?: string): readonly RegleDeNettoyage[] => [
  ...REGLES_COMMUNES,
  zeroInitialPerdu(codePostal)
];

export const nettoyerTelephone =
  (codePostal?: string) =>
  (telephone: string): string =>
    appliquerRegles(reglesTelephone(codePostal), telephone);

const REGION_OUTRE_MER: ReadonlyArray<readonly [RegExp, CountryCode]> = [
  [/^0(?:262|263|692|693)/u, 'RE'],
  [/^0(?:269|639)/u, 'YT'],
  [/^0(?:590|690)/u, 'GP'],
  [/^0(?:594|694)/u, 'GF'],
  [/^0(?:596|696)/u, 'MQ']
];

const regionDe = (compact: string): CountryCode =>
  REGION_OUTRE_MER.find(([prefixe]: readonly [RegExp, CountryCode]): boolean => prefixe.test(compact))?.[1] ?? 'FR';

export const telephoneCanonique = (telephone: string): string | null => {
  const compact: string = telephone.replace(/[\s()./-]/gu, '');
  const analyse = parsePhoneNumberFromString(compact, regionDe(compact));

  return analyse?.isValid() === true ? analyse.number : null;
};
