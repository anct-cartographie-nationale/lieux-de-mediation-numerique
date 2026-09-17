import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const ZERO_INITIAL_PERDU: RegleDeNettoyage = {
  nom: 'zéro initial perdu',
  selecteur: /^\d{4}$/u,
  corriger: (aCorriger: string): string => `0${aCorriger}`
};

const DECIMALES_SURNUMERAIRES: RegleDeNettoyage = {
  nom: 'décimales surnuméraires',
  selecteur: /\d+\.\d+/u,
  corriger: (aCorriger: string): string => parseInt(aCorriger, 10).toString()
};

export const REGLES_CODE_POSTAL: readonly RegleDeNettoyage[] = [ZERO_INITIAL_PERDU, DECIMALES_SURNUMERAIRES];

export const nettoyerCodePostal = (codePostal: string): string => appliquerRegles(REGLES_CODE_POSTAL, codePostal);
