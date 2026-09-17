import { z } from 'zod';
import { defineModel, type Model } from '../model';

/**
 * Le code officiel géographique de l'INSEE, sur cinq caractères :
 * - métropole : département sur deux caractères (01-19, 21-95), commune sur trois ;
 * - Corse : `2A` et `2B`, le code `20` d'avant 1976 étant exclu ;
 * - outre-mer : département ou collectivité sur trois caractères (971-978 pour les DOM et
 *   collectivités, 981-989 pour les territoires), commune sur deux.
 *
 * Vérifié contre les 18730 codes du jeu national, qu'il accepte tous, et contre les cas
 * absents de ce jeu mais légitimes : `97701` Saint-Barthélemy, `98818` Nouvelle-Calédonie,
 * `98735` Polynésie, et les arrondissements `75101`, `69381`, `13201`.
 */
const CODE_INSEE_REG_EXP: RegExp = /^(?:(?:0[1-9]|1\d|2[AB]|2[1-9]|[3-8]\d|9[0-5])\d{3}|(?:97[1-8]|98[1-9])\d{2})$/u;

export const CodeInsee = defineModel(
  z.string().regex(CODE_INSEE_REG_EXP, { error: 'Le code INSEE ne suit pas le code officiel géographique' }).brand('CodeInsee')
);

export type CodeInsee = Model.TypeOf<typeof CodeInsee>;
