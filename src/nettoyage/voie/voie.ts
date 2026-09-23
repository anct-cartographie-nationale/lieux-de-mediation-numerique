import { appliquerRegles, type RegleDeNettoyage } from '../regle';
import {
  DEBUT_DE_FORMULE,
  ESPACES_DE_BORD,
  ESPACES_MULTIPLES,
  REGLES_TYPOGRAPHIQUES,
  RETOURS_A_LA_LIGNE
} from '../typographie';
import { ABREVIATIONS_DE_TYPE_DE_VOIE, ABREVIATIONS_EN_TETE_DE_VOIE_SEULEMENT } from './types-de-voie';

const NUMERO_ZERO: RegleDeNettoyage = {
  nom: 'numéro zéro',
  selecteur: /^(0 Rue|00 Rue)/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^(0 Rue|00 Rue)/gu, 'Rue')
};

const CARACTERES_INTERDITS: RegleDeNettoyage = {
  nom: 'caractères interdits',
  selecteur: /[",²]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[",²]/gu, '')
};

const PREFIXE_NULL: RegleDeNettoyage = {
  nom: 'préfixe null',
  selecteur: /^[Nn][Uu][Ll][Ll]\s+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^[Nn][Uu][Ll][Ll]\s+/u, '')
};

const MENTION_NON_DIFFUSIBLE: RegleDeNettoyage = {
  nom: 'mention d’une adresse non diffusible',
  selecteur: /^\s*\[?\s*non[\s-]*diffusible\s*\]?\s*$/iu,
  corriger: (): string => ''
};

const SANS_LETTRE: RegleDeNettoyage = {
  nom: 'sans aucune lettre',
  selecteur: /\p{L}/u,
  negation: true,
  corriger: (): string => ''
};

const SEULEMENT_UN_CODE_POSTAL: RegleDeNettoyage = {
  nom: 'seulement un code postal',
  selecteur: /^\d{5}(\s.*)?$/u,
  corriger: (): string => ''
};

const CODE_POSTAL_ET_SUITE: RegleDeNettoyage = {
  nom: 'code postal et ce qui suit',
  selecteur: /^(?<voie>.*?)\s\d{5}\s\w+/u,
  corriger: (aCorriger: string): string => /^(?<voie>.*?)\s\d{5}\s\w+/u.exec(aCorriger)?.groups?.['voie'] ?? aCorriger
};

const touteCasse = (abreviation: string): string =>
  [abreviation, `${abreviation[0]}${abreviation.slice(1).toLowerCase()}`, abreviation.toLowerCase()].join('|');

const alternatives = (abreviations: string[]): string => abreviations.map(touteCasse).join('|');

const EN_TETE_DE_VOIE: string = '^\\s*|\\d\\s*(?:[Bb][Ii][Ss]|[Tt][Ee][Rr]|[Qq][Uu][Aa][Tt][Ee][Rr]|\\p{L})?\\s+';

const MOTIF_ABREVIATION: RegExp = new RegExp(
  `(?<![\\p{L}\\d])(?:${alternatives(
    Object.keys(ABREVIATIONS_DE_TYPE_DE_VOIE).filter(
      (abreviation: string): boolean => !ABREVIATIONS_EN_TETE_DE_VOIE_SEULEMENT.has(abreviation)
    )
  )}|(?<=${EN_TETE_DE_VOIE})(?:${alternatives([...ABREVIATIONS_EN_TETE_DE_VOIE_SEULEMENT])}))(?:(\\.)(?=\\p{Lu}\\p{Ll})|\\.?(?![\\p{L}\\d]|\\.\\p{L}))`,
  'gu'
);

const ABREVIATIONS_DE_VOIE: RegleDeNettoyage = {
  nom: 'abréviations de type de voie',
  selecteur: MOTIF_ABREVIATION,
  corriger: (aCorriger: string): string =>
    aCorriger.replace(MOTIF_ABREVIATION, (abreviation: string, pointColle: string | undefined): string => {
      const developpee: string | undefined = ABREVIATIONS_DE_TYPE_DE_VOIE[abreviation.replace('.', '').toUpperCase()];
      if (developpee == null) return abreviation;
      return pointColle == null ? developpee : `${developpee} `;
    })
};

const SUFFIXE_DE_NUMERO: RegleDeNettoyage = {
  nom: 'suffixe bis, ter ou quater collé au numéro',
  selecteur: /^\s*\d+\s+([Bb][Ii][Ss]|[Tt][Ee][Rr]|[Qq][Uu][Aa][Tt][Ee][Rr])\b/u,
  corriger: (aCorriger: string): string =>
    aCorriger.replace(
      /^(\s*\d+)\s+([Bb][Ii][Ss]|[Tt][Ee][Rr]|[Qq][Uu][Aa][Tt][Ee][Rr])\b/u,
      (_: string, numero: string, suffixe: string): string => `${numero}${suffixe.toLowerCase()}`
    )
};

export const REGLES_VOIE: readonly RegleDeNettoyage[] = [
  ...REGLES_TYPOGRAPHIQUES,
  ESPACES_MULTIPLES,
  NUMERO_ZERO,
  CARACTERES_INTERDITS,
  RETOURS_A_LA_LIGNE,
  PREFIXE_NULL,
  MENTION_NON_DIFFUSIBLE,
  SEULEMENT_UN_CODE_POSTAL,
  CODE_POSTAL_ET_SUITE,
  ABREVIATIONS_DE_VOIE,
  SUFFIXE_DE_NUMERO,
  DEBUT_DE_FORMULE,
  SANS_LETTRE,
  ESPACES_DE_BORD
];

export const nettoyerVoie = (voie: string): string => appliquerRegles(REGLES_VOIE, voie);
