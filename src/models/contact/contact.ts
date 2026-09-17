import { z } from 'zod';
import { Courriel } from '../courriel';
import { defineModel, type Model } from '../model';
import { Url } from '../url';
import { Telephone } from './telephone';

export const Contact = defineModel(
  z
    .object({
      telephone: Telephone.schema.optional(),
      courriels: z.array(Courriel.schema).optional(),
      site_web: z.array(Url.schema).optional()
    })
    .brand('Contact')
);

/** La forme, telle qu'on l'écrit avant de la faire valider. */
export type ContactToValidate = Model.InputOf<typeof Contact>;

/** Une valeur dont le constructeur a vérifié chaque partie. */
export type Contact = Model.TypeOf<typeof Contact>;
