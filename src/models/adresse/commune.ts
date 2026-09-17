import { z } from 'zod';
import { defineModel, type Model } from '../model';

const COMMUNE_REG_EXP: RegExp = /^[A-Za-z\dÀ-ÖØ-öø-ÿœ-ŸŒ\-'’\s]+$/u;

export const Commune = defineModel(
  z.string().regex(COMMUNE_REG_EXP, { error: "Le nom de commune n'est pas reconnu" }).brand('Commune')
);

export type Commune = Model.TypeOf<typeof Commune>;
