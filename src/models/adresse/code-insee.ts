import { z } from 'zod';
import { defineModel, type Model } from '../model';

const CODE_INSEE_REG_EXP: RegExp = /^(?:(?:0[1-9]|1\d|2[AB]|2[1-9]|[3-8]\d|9[0-5])\d{3}|(?:97[1-8]|98[1-9])\d{2})$/u;

export const CodeInsee = defineModel(
  z.string().regex(CODE_INSEE_REG_EXP, { error: 'Le code INSEE ne suit pas le code officiel géographique' }).brand('CodeInsee')
);

export type CodeInsee = Model.TypeOf<typeof CodeInsee>;
