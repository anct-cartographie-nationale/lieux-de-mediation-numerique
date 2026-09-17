import { z } from 'zod';
import { defineModel, type Model } from '../model';

const TELEPHONE_REG_EXP: RegExp = /^\+(?:33|262|269|508|590|594|596|681|687|689)\d{6,9}$/u;

export const Telephone = defineModel(
  z
    .string()
    .regex(TELEPHONE_REG_EXP, { error: 'Le téléphone doit être au format E.164 avec un indicatif français' })
    .brand('Telephone')
);

export type Telephone = Model.TypeOf<typeof Telephone>;
