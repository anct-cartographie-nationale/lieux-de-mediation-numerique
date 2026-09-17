import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const RETOURS_A_LA_LIGNE: RegleDeNettoyage = {
  nom: 'retours à la ligne',
  selecteur: /[\n\r]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[\n\r]+/gu, ' ')
};

/** Un guillemet droit dans un nom casse tout format qui s'en sert pour délimiter ses champs. */
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

/**
 * Le nom réparé.
 *
 * Ce nettoyage porte sur la **valeur**, une fois pour toutes, et non sur chaque format de
 * sortie. Le faire à la sérialisation — ce que fait mednum-cli aujourd'hui, côté CSV
 * seulement — laisse le JSON et le CSV d'un même jeu porter deux noms différents.
 */
export const nettoyerNom = (nom: string): string => appliquerRegles(REGLES_NOM, nom);
