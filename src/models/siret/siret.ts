import { Model } from '../model';
import { SiretError } from './errors';

export type Siret = Model<'Siret', string>;

const throwSiretError = (siretNumber: string): Siret => {
  throw new SiretError(siretNumber);
};

export const isSiret = (siret: string): siret is Siret => siret.length === 14;

export const Siret = (siret: string): Siret => {
  const siretWithoutSpaces: string = siret.replace(/\s/gu, '');
  return isSiret(siretWithoutSpaces) ? siretWithoutSpaces : throwSiretError(siretWithoutSpaces);
};
