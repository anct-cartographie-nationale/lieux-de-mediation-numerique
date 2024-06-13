import { Model } from '../model';
import { RnaError } from './errors';

export type Rna = Model<'Rna', string>;

const throwRnaError = (rnaNumber: string): Rna => {
  throw new RnaError(rnaNumber);
};

const RNA_REG_EXP: RegExp = /^W[a-zA-Z0-9]{9}$/u;

export const isRna = (rna: string): rna is Rna => RNA_REG_EXP.test(rna);

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Rna = (rna: string): Rna => (isRna(rna) ? rna : throwRnaError(rna));
