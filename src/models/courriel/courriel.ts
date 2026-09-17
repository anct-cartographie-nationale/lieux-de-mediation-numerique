import { z } from 'zod';
import { defineModel, type Model } from '../model';

const COURRIEL_REG_EXP: RegExp =
  /^(?:[a-zA-Z0-9_][a-zA-Z0-9.!#$%&'*+\\=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])+(?:;|$))+$/u;

export const Courriel = defineModel(
  z.string().regex(COURRIEL_REG_EXP, { error: "L'adresse électronique n'est pas reconnue" }).brand('Courriel')
);

export type Courriel = Model.TypeOf<typeof Courriel>;
