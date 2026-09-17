import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const RETOURS_A_LA_LIGNE: RegleDeNettoyage = {
  nom: 'retours à la ligne',
  selecteur: /[\n\r]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[\n\r]+/gu, ' ')
};

const GUILLEMETS: RegleDeNettoyage = {
  nom: 'guillemets droits',
  selecteur: /"/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/"/gu, '')
};

const ESPACES_MULTIPLES: RegleDeNettoyage = {
  nom: 'espaces multiples',
  selecteur: /\s{2,}/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s+/gu, ' ')
};

const ESPACES_DE_BORD: RegleDeNettoyage = {
  nom: 'espaces de bord',
  selecteur: /^\s+|\s+$/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

export const REGLES_NOM: readonly RegleDeNettoyage[] = [RETOURS_A_LA_LIGNE, GUILLEMETS, ESPACES_MULTIPLES, ESPACES_DE_BORD];

export const nettoyerNom = (nom: string): string => appliquerRegles(REGLES_NOM, nom);
