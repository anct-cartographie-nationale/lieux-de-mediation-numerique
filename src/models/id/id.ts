import { Model } from '../model';
import { IdError } from './errors';

export type IdToValidate = string | undefined;

export type Id = Model<'Id', string>;

export const isValidId = (idData: IdToValidate): idData is Id => idData != null && idData !== '';

const throwIdError = (idData: IdToValidate): Id => {
  if (!isValidId(idData)) {
    throw new IdError(idData);
  }

  throw new Error();
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Id = (id: IdToValidate): Id => (isValidId(id) ? id : throwIdError(id));
