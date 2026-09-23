import { z } from 'zod';
import { defineModel, type Model } from '../model';

export const CARACTERES_D_ADRESSE: string = "0-9A-Za-zÀ-ÖØ-öø-ÿœ-ŸŒ\\-,()°.:'’/\\s–—«»“”&@\\[\\]";

export const DEBUT_SANS_FORMULE: string = '(?![-@])';

export const VOIE_REG_EXP: RegExp = new RegExp(`^${DEBUT_SANS_FORMULE}(?=.*\\p{L})[${CARACTERES_D_ADRESSE}]+$`, 'u');

export const Voie = defineModel(z.string().regex(VOIE_REG_EXP, { error: "La voie n'est pas reconnue" }).brand('Voie'));

export type Voie = Model.TypeOf<typeof Voie>;
