import { Model } from '../model';
import { RidetError } from './errors';

export type Ridet = Model<'Ridet', string>;

const throwRidetError = (ridetNumber: string): Ridet => {
  throw new RidetError(ridetNumber);
};

const RIDET_REG_EXP: RegExp = /^\d{6,7}$/u;

export const isRidet = (ridet: string): ridet is Ridet => RIDET_REG_EXP.test(ridet);

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Ridet = (ridet: string): Ridet => {
  const ridetWithoutSpaces: string = ridet.replace(/\s/gu, '');
  return isRidet(ridetWithoutSpaces) ? ridetWithoutSpaces : throwRidetError(ridetWithoutSpaces);
};
