import { isSiret, Siret } from '../siret/siret';
import { isRna, Rna } from '../rna/rna';

export class PivotError extends Error {
  constructor(pivot: string) {
    super(`Le Pivot ${pivot} n'est pas valide`);
  }
}

export type Pivot = Rna | Siret;

const throwPivotError = (pivot: string): Pivot => {
  throw new PivotError(pivot);
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Pivot = (pivot: string): Pivot => (isSiret(pivot) || isRna(pivot) ? pivot : throwPivotError(pivot));
