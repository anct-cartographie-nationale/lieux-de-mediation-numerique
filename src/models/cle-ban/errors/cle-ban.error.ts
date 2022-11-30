import { ModelError } from '../../../errors';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class CleBanError extends ModelError<LieuMediationNumerique> {
  constructor(cleBan: string) {
    super('cle_ban', `Le CleBan ${cleBan} n'est pas valide`);
  }
}
