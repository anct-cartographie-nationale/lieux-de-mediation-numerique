import { isSiret, Siret } from '../siret/siret';
import { isRna, Rna } from '../rna/rna';
import { PivotError } from './errors';

export type Pivot = Rna | Siret;

const throwPivotError = (pivot: string): Pivot => {
  throw new PivotError(pivot);
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Pivot = (pivot: string): Pivot => (isSiret(pivot) || isRna(pivot) ? pivot : throwPivotError(pivot));
