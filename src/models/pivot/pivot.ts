import { isSiret, Siret } from '../siret';
import { PivotError } from './errors';

/**
 * L'immatriculation qui identifie la structure. Le RNA en faisait partie ; il en est sorti,
 * cinq lieux sur dix-huit mille sept cent soixante-neuf en portant un.
 */
export type Pivot = Siret;

const throwPivotError = (pivot: string): Pivot => {
  throw new PivotError(pivot);
};

export const Pivot = (pivot: string): Pivot => (isSiret(pivot) ? pivot : throwPivotError(pivot));
