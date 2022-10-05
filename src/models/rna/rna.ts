import { Model } from '../model';

export class RnaError extends Error {
  constructor(rna: string) {
    super(`Le Rna ${rna} n'est pas valide`);
  }
}

export type Rna = Model<'Rna', string>;

const throwRnaError = (rnaNumber: string): Rna => {
  throw new RnaError(rnaNumber);
};

const RNA_REG_EX: RegExp = /^W[a-zA-Z0-9]{9}$/u;

export const isRna = (rna: string): rna is Rna => RNA_REG_EX.test(rna);

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Rna = (rna: string): Rna => (isRna(rna) ? rna : throwRnaError(rna));
