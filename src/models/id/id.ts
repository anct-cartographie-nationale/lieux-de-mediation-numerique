import { z } from 'zod';
import { defineModel, type Model } from '../model';

const ID_REG_EXP: RegExp = /^[A-Za-z0-9._~-]+$/u;

export const Id = defineModel(
  z.string().regex(ID_REG_EXP, { error: "L'identifiant ne doit être ni vide ni porteur d'un caractère à échapper" }).brand('Id')
);

export type Id = Model.TypeOf<typeof Id>;
