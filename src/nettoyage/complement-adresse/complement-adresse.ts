import { appliquerRegles, type RegleDeNettoyage } from '../regle';
import {
  DEBUT_DE_FORMULE,
  ESPACES_DE_BORD,
  ESPACES_MULTIPLES,
  GUILLEMETS_DROITS,
  REGLES_TYPOGRAPHIQUES,
  RETOURS_A_LA_LIGNE
} from '../typographie';

const NI_TEXTE_NI_NUMERO: RegleDeNettoyage = {
  nom: 'ni un texte ni un numéro, comme un téléphone, un code postal ou un SIRET',
  selecteur: /\p{L}|^\d{1,4}$/u,
  negation: true,
  corriger: (): string => ''
};

export const REGLES_COMPLEMENT_ADRESSE: readonly RegleDeNettoyage[] = [
  ...REGLES_TYPOGRAPHIQUES,
  RETOURS_A_LA_LIGNE,
  ESPACES_MULTIPLES,
  GUILLEMETS_DROITS,
  DEBUT_DE_FORMULE,
  ESPACES_DE_BORD,
  NI_TEXTE_NI_NUMERO
];

export const nettoyerComplementAdresse = (complementAdresse: string): string =>
  appliquerRegles(REGLES_COMPLEMENT_ADRESSE, complementAdresse);
