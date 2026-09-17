import { z } from 'zod';
import { defineModel, type Model } from '../model';

/** Un nom fait d'espaces est un nom vide : `!== ''` ne suffisait pas à le dire. */
export const Nom = defineModel(z.string().trim().min(1, { error: 'Le nom ne doit pas être vide' }).brand('Nom'));

export type Nom = Model.TypeOf<typeof Nom>;
