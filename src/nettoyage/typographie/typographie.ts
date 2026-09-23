import type { RegleDeNettoyage } from '../regle';
import { relireCommeUtf8 } from './decodeur-utf8';

export const ENCODAGE_ABIME: RegleDeNettoyage = {
  nom: 'encodage abîmé',
  selecteur: /Ã[\x80-\xFF]/u,
  corriger: relireCommeUtf8
};

export const ACCENTS_DECOMPOSES: RegleDeNettoyage = {
  nom: 'accents décomposés',
  selecteur: /\p{M}/u,
  corriger: (aCorriger: string): string => aCorriger.normalize('NFC')
};

export const CARACTERES_INVISIBLES: RegleDeNettoyage = {
  nom: 'caractères invisibles',
  selecteur: /[­​-‍⁠﻿]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[­​-‍⁠﻿]/gu, '')
};

export const APOSTROPHE_ABIMEE: RegleDeNettoyage = {
  nom: 'apostrophe abîmée par un encodage Windows-1252',
  selecteur: /\u0092/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\u0092/gu, "'")
};

export const APOSTROPHES_HORS_CHARTE: RegleDeNettoyage = {
  nom: 'apostrophes hors charte',
  selecteur: /[`´ʼ‘′]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[`´ʼ‘′]/gu, '’')
};

export const TIRETS_HORS_CHARTE: RegleDeNettoyage = {
  nom: 'tirets hors charte',
  selecteur: /[‐-‒―−]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[‐-‒―−]/gu, '-')
};

export const INDICATEUR_ORDINAL: RegleDeNettoyage = {
  nom: 'indicateur ordinal tapé pour un degré',
  selecteur: /º/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/º/gu, '°')
};

export const SOULIGNES: RegleDeNettoyage = {
  nom: 'soulignés en guise d’espaces',
  selecteur: /_/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/_/gu, ' ')
};

export const RETOURS_A_LA_LIGNE: RegleDeNettoyage = {
  nom: 'retours à la ligne',
  selecteur: /\n|\\n/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\n|\\n/u, ' ')
};

export const GUILLEMETS_DROITS: RegleDeNettoyage = {
  nom: 'guillemets droits',
  selecteur: /"/u,
  corriger: (aCorriger: string): string =>
    aCorriger
      .replace(/"\s*([^"]*?)\s*"/gu, (_: string, cite: string): string => (cite === '' ? '' : `« ${cite} »`))
      .replace(/"/gu, '')
};

export const DEBUT_DE_FORMULE: RegleDeNettoyage = {
  nom: 'début qu’un tableur lirait comme une formule',
  selecteur: /^[\s\-@=+]*[-@=+]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^[\s\-@=+]+/u, '')
};

export const ESPACES_MULTIPLES: RegleDeNettoyage = {
  nom: 'espaces multiples',
  selecteur: /\s+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s+/gu, ' ')
};

export const ESPACES_DE_BORD: RegleDeNettoyage = {
  nom: 'espaces de bord',
  selecteur: /^\s+|\s+$/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

export const REGLES_TYPOGRAPHIQUES: readonly RegleDeNettoyage[] = [
  ENCODAGE_ABIME,
  ACCENTS_DECOMPOSES,
  CARACTERES_INVISIBLES,
  APOSTROPHE_ABIMEE,
  APOSTROPHES_HORS_CHARTE,
  TIRETS_HORS_CHARTE,
  INDICATEUR_ORDINAL,
  SOULIGNES
];
