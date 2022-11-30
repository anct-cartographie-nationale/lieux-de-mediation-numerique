import { ModelError } from '../../../errors';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class PivotError extends ModelError<LieuMediationNumerique> {
  constructor(pivot: string) {
    super('pivot', `Le Pivot ${pivot} n'est pas valide`);
  }
}
