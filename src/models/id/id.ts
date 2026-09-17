import { z } from 'zod';
import { defineModel, type Model } from '../model';

const ID_REG_EXP: RegExp = /^(?=.*[\p{L}\p{Nd}])[\p{L}\p{M}\p{Nd}._~/-]+$/u;

export const Id = defineModel(
  z
    .string()
    .regex(ID_REG_EXP, {
      error: "L'identifiant ne doit être ni vide ni porteur d'un espace ou d'un séparateur d'URL"
    })
    .brand('Id')
);

export type Id = Model.TypeOf<typeof Id>;
