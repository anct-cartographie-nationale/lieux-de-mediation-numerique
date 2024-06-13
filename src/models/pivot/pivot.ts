import { isSiret, Siret } from '../siret';
import { isRidet, Ridet } from '../ridet';
import { isRna, Rna } from '../rna';
import { PivotError } from './errors';

export type Pivot = Ridet | Rna | Siret;

const throwPivotError = (pivot: string): Pivot => {
  throw new PivotError(pivot);
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Pivot = (pivot: string): Pivot =>
  isSiret(pivot) || isRna(pivot) || isRidet(pivot) ? pivot : throwPivotError(pivot);
