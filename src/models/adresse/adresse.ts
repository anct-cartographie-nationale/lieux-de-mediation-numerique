import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { CodeInsee } from './code-insee';
import { CodePostal } from './code-postal';
import { Commune } from './commune';
import { ComplementAdresse } from './complement-adresse';
import { Voie } from './voie';

export const Adresse = defineModel(
  z
    .object({
      voie: Voie.schema,
      complement_adresse: ComplementAdresse.schema.optional(),
      code_postal: CodePostal.schema,
      code_insee: CodeInsee.schema.optional(),
      commune: Commune.schema
    })
    .brand('Adresse')
);

export type AdresseToValidate = Model.InputOf<typeof Adresse>;

export type Adresse = Model.TypeOf<typeof Adresse>;
