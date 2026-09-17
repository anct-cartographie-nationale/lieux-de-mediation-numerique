import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { VOIE_REG_EXP } from './voie';

export const ComplementAdresse = defineModel(
  z.string().regex(VOIE_REG_EXP, { error: "Le complément d'adresse n'est pas reconnu" }).brand('ComplementAdresse')
);

export type ComplementAdresse = Model.TypeOf<typeof ComplementAdresse>;
