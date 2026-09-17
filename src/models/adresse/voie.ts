import { z } from 'zod';
import { defineModel, type Model } from '../model';

export const VOIE_REG_EXP: RegExp = /^(?=.*\p{L})[0-9A-Za-z\dÀ-ÖØ-öø-ÿœ-ŸŒ\-,()°.:'’/\s]+$/u;

export const Voie = defineModel(z.string().regex(VOIE_REG_EXP, { error: "La voie n'est pas reconnue" }).brand('Voie'));

export type Voie = Model.TypeOf<typeof Voie>;
