import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const PRECISION_ENTRE_PARENTHESES: RegleDeNettoyage = {
  nom: 'précision entre parenthèses',
  selecteur: /\s*\(.*\)\s*/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s*\(.*\)\s*/u, '')
};

const ACCENT_ABIME: RegleDeNettoyage = {
  nom: 'accent abîmé par un encodage DOS',
  selecteur: /╢/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/╢/gu, 'Â')
};

const APOSTROPHE_COURBE: RegleDeNettoyage = {
  nom: 'apostrophe courbe',
  selecteur: /’/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/’/gu, "'")
};

const SAINT_ABREGE_EN_TETE: RegleDeNettoyage = {
  nom: 'Saint abrégé en tête',
  selecteur: /^[Ss][Tt][-\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^[Ss][Tt][-\s]/gu, 'Saint-')
};

const SAINTE_ABREGE_EN_TETE: RegleDeNettoyage = {
  nom: 'Sainte abrégé en tête',
  selecteur: /^[Ss][Tt][Ee][-\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^[Ss][Tt][Ee][-\s]/gu, 'Sainte-')
};

const SAINT_ABREGE: RegleDeNettoyage = {
  nom: 'Saint abrégé',
  selecteur: /[-\s][Ss][Tt][-\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[-\s][Ss][Tt][-\s]/gu, '-Saint-')
};

const SAINTE_ABREGE: RegleDeNettoyage = {
  nom: 'Sainte abrégé',
  selecteur: /[-\s][Ss][Tt][Ee][-\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[-\s][Ss][Tt][Ee][-\s]/gu, '-Sainte-')
};

const TEXTE_ENTRE_PARENTHESES: RegleDeNettoyage = {
  nom: 'texte entre parenthèses',
  selecteur: /\([^)]+\)/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

const ARRONDISSEMENT: RegleDeNettoyage = {
  nom: 'arrondissement',
  selecteur: /\d+er?/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\d+er?/u, '')
};

const CEDEX: RegleDeNettoyage = {
  nom: 'mention CEDEX',
  selecteur: /-?[Cc](?:[ÉE]DEX|[ée]dex)\s?\d*/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/-?[Cc](?:[ÉE]DEX|[ée]dex)\s?\d*/u, '')
};

const CHIFFRES: RegleDeNettoyage = {
  nom: 'chiffres',
  selecteur: /\d+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\d+/gu, '')
};

const ESPACE_APRES_APOSTROPHE: RegleDeNettoyage = {
  nom: 'espace après apostrophe',
  selecteur: /'\s+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/'\s+/u, "'")
};

const ESPACES_DE_BORD: RegleDeNettoyage = {
  nom: 'espaces de bord',
  selecteur: /^\s+|\s+$/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

const ESPACES_EN_TIRETS: RegleDeNettoyage = {
  nom: 'espaces en tirets',
  selecteur: /\s/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s/gu, '-')
};

export const REGLES_COMMUNE: readonly RegleDeNettoyage[] = [
  PRECISION_ENTRE_PARENTHESES,
  ACCENT_ABIME,
  APOSTROPHE_COURBE,
  SAINT_ABREGE_EN_TETE,
  SAINTE_ABREGE_EN_TETE,
  SAINT_ABREGE,
  SAINTE_ABREGE,
  TEXTE_ENTRE_PARENTHESES,
  ARRONDISSEMENT,
  CEDEX,
  CHIFFRES,
  ESPACE_APRES_APOSTROPHE,
  ESPACES_DE_BORD,
  ESPACES_EN_TIRETS
];

export const nettoyerCommune = (commune: string): string => appliquerRegles(REGLES_COMMUNE, commune);
