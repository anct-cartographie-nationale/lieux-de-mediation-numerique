import { z } from 'zod';
import { defineModel, type Model } from '../model';

/**
 * L'identifiant sert de clé et voyage dans des URL : il ne porte ni espace ni caractère à
 * échapper. mednum-cli remplaçait déjà les espaces par des tirets ; le contrat le dit
 * désormais.
 */
const ID_REG_EXP: RegExp = /^[A-Za-z0-9._~-]+$/u;

export const Id = defineModel(
  z.string().regex(ID_REG_EXP, { error: "L'identifiant ne doit être ni vide ni porteur d'un caractère à échapper" }).brand('Id')
);

export type Id = Model.TypeOf<typeof Id>;
