import { isSiret, Siret } from '../siret';
import { isRna, Rna } from '../rna';
import { PivotError } from './errors';

export type Pivot = Rna | Siret;

const throwPivotError = (pivot: string): Pivot => {
  throw new PivotError(pivot);
};

export const Pivot = (pivot: string): Pivot => (isSiret(pivot) || isRna(pivot) ? pivot : throwPivotError(pivot));
