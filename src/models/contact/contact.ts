import { z } from 'zod';
import { Courriel } from '../courriel';
import { triee } from '../liste';
import { defineModel, type Model } from '../model';
import { Url } from '../url';
import { Telephone } from './telephone';

export const Contact = defineModel(
  z
    .object({
      telephone: Telephone.schema.optional(),
      courriels: z.array(Courriel.schema).transform(triee).optional(),
      site_web: z.array(Url.schema).transform(triee).optional()
    })
    .brand('Contact')
);

export type ContactToValidate = Model.InputOf<typeof Contact>;

export type Contact = Model.TypeOf<typeof Contact>;
