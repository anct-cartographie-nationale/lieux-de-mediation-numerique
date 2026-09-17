import { z } from 'zod';
import { defineModel, type Model } from '../model';

export const Nom = defineModel(
  z
    .string()
    .refine((nom: string): boolean => nom.trim() !== '', { error: 'Le nom ne doit pas être vide' })
    .brand('Nom')
);

export type Nom = Model.TypeOf<typeof Nom>;
