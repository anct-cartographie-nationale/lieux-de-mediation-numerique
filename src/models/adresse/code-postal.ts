import { z } from 'zod';
import { defineModel, type Model } from '../model';

const CODE_POSTAL_REG_EXP: RegExp = /^(?:(?:0[1-9]|[1-8]\d|9[0-5])\d{3}|(?:97[1-8]|98[4-9])\d{2})$/u;

export const CodePostal = defineModel(
  z
    .string()
    .regex(CODE_POSTAL_REG_EXP, { error: 'Le code postal doit être composé de 5 chiffres et désigner un département réel' })
    .brand('CodePostal')
);

export type CodePostal = Model.TypeOf<typeof CodePostal>;
