import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const ESPACES_DE_BORD: RegleDeNettoyage = {
  nom: 'espaces de bord',
  selecteur: /^\s+|\s+$/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

const ESPACE_AVANT_LE_POINT: RegleDeNettoyage = {
  nom: 'espace avant le point',
  selecteur: /\w\s\./u,
  corriger: (aCorriger: string): string => aCorriger.replace(/(\w)\s\./u, '$1.')
};

const ESPACE_DANS_LE_DOMAINE: RegleDeNettoyage = {
  nom: 'espace dans le domaine',
  selecteur: /^\w+@\w+\s\w+\.\w+$/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s/u, '')
};

const ESPACE_COLLE_A_L_AROBASE: RegleDeNettoyage = {
  nom: 'espace collé à l arobase',
  selecteur: /\s@|@\s/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s*@\s*/gu, '@')
};

const LIBELLE_EN_TETE: RegleDeNettoyage = {
  nom: 'libellé en tête',
  selecteur: /^\w+[;\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^\w+[;\s]/u, '')
};

const LIBELLE_AVEC_DEUX_POINTS: RegleDeNettoyage = {
  nom: 'libellé séparé par deux points',
  selecteur: /\S\s:\s\S/u,
  corriger: (aCorriger: string): string => aCorriger.split(/\s:\s/u)[1] ?? ''
};

const AROBASE_DOUBLEE: RegleDeNettoyage = {
  nom: 'arobase doublée',
  selecteur: /@@/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/@@/u, '@')
};

const PREFIXE_MAILTO: RegleDeNettoyage = {
  nom: 'préfixe mailto ou deux points',
  selecteur: /^mailto:|:/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^mailto:|:/u, '')
};

const POINT_INITIAL: RegleDeNettoyage = {
  nom: 'point initial',
  selecteur: /^\.([^@]+)@/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^\.([^@]+)@/u, '$1@')
};

const SEPARATEUR_INATTENDU: RegleDeNettoyage = {
  nom: 'séparateur inattendu entre adresses',
  selecteur: /\S\s?(?:et|ou|;|\s|\/)\s?\S/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s?(?:et|ou|;|\s|\/)\s?/gu, '|')
};

const AROBASE_MASQUEE: RegleDeNettoyage = {
  nom: 'arobase masquée',
  selecteur: /\[a\]/u,
  corriger: (aCorriger: string): string => aCorriger.replace('[a]', '@')
};

const ACCENTS: RegleDeNettoyage = {
  nom: 'accents, qu une adresse ne porte pas',
  selecteur: /[éèç]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[éè]/gu, 'e').replace(/ç/gu, 'c')
};

export const REGLES_COURRIEL: readonly RegleDeNettoyage[] = [
  ESPACES_DE_BORD,
  ESPACE_COLLE_A_L_AROBASE,
  ESPACE_AVANT_LE_POINT,
  ESPACE_DANS_LE_DOMAINE,
  LIBELLE_AVEC_DEUX_POINTS,
  LIBELLE_EN_TETE,
  PREFIXE_MAILTO,
  AROBASE_MASQUEE,
  AROBASE_DOUBLEE,
  POINT_INITIAL,
  ACCENTS,
  SEPARATEUR_INATTENDU
];

export const nettoyerCourriel = (courriel: string): string => appliquerRegles(REGLES_COURRIEL, courriel);
