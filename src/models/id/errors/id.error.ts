import { ModelError } from '../../../errors';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class IdError extends ModelError<LieuMediationNumerique> {
  constructor(id?: string) {
    super('id', `L'Id ${id} n'est pas valide`);
  }
}
