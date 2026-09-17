import { z } from 'zod';
import { defineModel, type Model } from './model';

export const RESUME_LONGUEUR_MAXIMALE = 280;

export const DETAIL_LONGUEUR_MAXIMALE = 10000;

export const Presentation = defineModel(
  z
    .object({
      resume: z
        .string()
        .max(RESUME_LONGUEUR_MAXIMALE, { error: `Le résumé doit faire au plus ${RESUME_LONGUEUR_MAXIMALE} caractères` })
        .optional(),
      detail: z
        .string()
        .max(DETAIL_LONGUEUR_MAXIMALE, { error: `Le détail doit faire au plus ${DETAIL_LONGUEUR_MAXIMALE} caractères` })
        .optional()
    })
    .brand('Presentation')
);

export type PresentationToValidate = Model.InputOf<typeof Presentation>;

export type Presentation = Model.TypeOf<typeof Presentation>;
