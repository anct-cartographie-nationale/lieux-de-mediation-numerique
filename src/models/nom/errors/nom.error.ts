import { ModelError } from '../../../errors';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class NomError extends ModelError<LieuMediationNumerique> {
  constructor(nom?: string) {
    super('nom', `Le Nom ${nom} n'est pas valide`);
  }
}
