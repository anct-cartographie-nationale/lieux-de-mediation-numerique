import { appliquerRegles, type RegleDeNettoyage } from '../regle';

/**
 * Un code postal à quatre chiffres a perdu son zéro initial, presque toujours en passant par un
 * tableur qui l'a lu comme un nombre : `01000` y devient `1000`.
 */
const ZERO_INITIAL_PERDU: RegleDeNettoyage = {
  nom: 'zéro initial perdu',
  selecteur: /^\d{4}$/u,
  corriger: (aCorriger: string): string => `0${aCorriger}`
};

/** Même cause, autre effet : le tableur a rendu un décimal, `01000` devenant `1000.0`. */
const DECIMALES_SURNUMERAIRES: RegleDeNettoyage = {
  nom: 'décimales surnuméraires',
  selecteur: /\d+\.\d+/u,
  corriger: (aCorriger: string): string => parseInt(aCorriger, 10).toString()
};

export const REGLES_CODE_POSTAL: readonly RegleDeNettoyage[] = [ZERO_INITIAL_PERDU, DECIMALES_SURNUMERAIRES];

/**
 * Le code postal réparé. Ne valide rien : un code qui reste invalide après nettoyage est
 * l'affaire de la validation, pas de la réparation.
 */
export const nettoyerCodePostal = (codePostal: string): string => appliquerRegles(REGLES_CODE_POSTAL, codePostal);
