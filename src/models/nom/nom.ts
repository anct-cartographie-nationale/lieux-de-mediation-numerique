import { Model } from '../model';
import { NomError } from './errors';

export type NomToValidate = string | undefined;

export type Nom = Model<'Nom', string>;

export const isValidNom = (nomData: NomToValidate): nomData is Nom => nomData != null && nomData !== '';

const throwNomError = (nomData: NomToValidate): Nom => {
  if (!isValidNom(nomData)) {
    throw new NomError(nomData);
  }

  throw new Error();
};

export const Nom = (nom: NomToValidate): Nom => (isValidNom(nom) ? nom : throwNomError(nom));
