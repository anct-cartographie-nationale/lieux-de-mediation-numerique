import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { CARACTERES_D_ADRESSE, DEBUT_SANS_FORMULE } from './voie';

export const COMPLEMENT_ADRESSE_REG_EXP: RegExp = new RegExp(
  `^${DEBUT_SANS_FORMULE}(?:(?=.*\\p{L})[${CARACTERES_D_ADRESSE}]+|\\d{1,4})$`,
  'u'
);

export const ComplementAdresse = defineModel(
  z
    .string()
    .regex(COMPLEMENT_ADRESSE_REG_EXP, { error: "Le complément d'adresse n'est pas reconnu" })
    .brand('ComplementAdresse')
);

export type ComplementAdresse = Model.TypeOf<typeof ComplementAdresse>;
