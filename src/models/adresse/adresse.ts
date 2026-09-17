import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { CodeInsee } from './code-insee';
import { CodePostal } from './code-postal';
import { Commune } from './commune';
import { Voie } from './voie';

/**
 * L'adresse imbrique les schémas de ses parties plutôt que de redire leurs règles : une
 * adresse fautive sur quatre champs rend quatre erreurs, chacune désignée par son chemin, là
 * où le constructeur d'avant s'arrêtait à la première.
 */
export const Adresse = defineModel(
  z
    .object({
      voie: Voie.schema,
      complement_adresse: z.string().optional(),
      code_postal: CodePostal.schema,
      code_insee: CodeInsee.schema.optional(),
      commune: Commune.schema
    })
    .brand('Adresse')
);

/** La forme, telle qu'on l'écrit avant de la faire valider. */
export type AdresseToValidate = Model.InputOf<typeof Adresse>;

/** Une valeur dont le constructeur a vérifié chaque partie. */
export type Adresse = Model.TypeOf<typeof Adresse>;
