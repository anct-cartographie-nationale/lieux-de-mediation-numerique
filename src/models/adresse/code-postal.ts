import { z } from 'zod';
import { defineModel, type Model } from '../model';

const CODE_POSTAL_REG_EXP: RegExp = /^\d{5}$/u;

export const CodePostal = defineModel(
  z.string().regex(CODE_POSTAL_REG_EXP, { error: 'Le code postal doit être composé de 5 chiffres' }).brand('CodePostal')
);

export type CodePostal = Model.TypeOf<typeof CodePostal>;
