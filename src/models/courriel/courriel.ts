import { Model } from '../model';
import { CourrielError } from './errors';

export type Courriel = Model<'Courriel', string>;

const COURRIEL_REG_EXP: RegExp =
  /^(?:[a-zA-Z0-9_][a-zA-Z0-9.!#$%&'*+\\=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])+(?:;|$))+$/u;

const throwCourrielError = (courriel: string): Courriel => {
  throw new CourrielError(courriel);
};

export const isValidCourriel = (courriel: string): courriel is Courriel => COURRIEL_REG_EXP.test(courriel);

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Courriel = (courriel: string): Courriel => (isValidCourriel(courriel) ? courriel : throwCourrielError(courriel));
