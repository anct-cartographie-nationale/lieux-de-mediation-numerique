import type { Model } from '../model';
import { IdError } from './errors';

export type IdToValidate = string | undefined;

export type Id = Model<'Id', string>;

/**
 * L'identifiant sert de clé et voyage dans des URL : il ne porte ni espace ni caractère à
 * échapper. mednum-cli remplaçait déjà les espaces par des tirets ; le contrat le dit
 * désormais.
 */
const ID_REG_EXP: RegExp = /^[A-Za-z0-9._~-]+$/u;

export const isValidId = (idData: IdToValidate): idData is Id => idData != null && ID_REG_EXP.test(idData);

const throwIdError = (idData: IdToValidate): Id => {
  if (!isValidId(idData)) {
    throw new IdError(idData);
  }

  throw new Error();
};

export const Id = (id: IdToValidate): Id => (isValidId(id) ? id : throwIdError(id));
