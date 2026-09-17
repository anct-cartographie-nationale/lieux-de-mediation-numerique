import { ModelError } from '../../../errors';
import type { Typologie, TypologiesIndefinie } from '../typologie';
import type { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class TypologiesError extends ModelError<LieuMediationNumerique> {
  constructor(typologie: Typologie | TypologiesIndefinie) {
    super('typologies', `La typologie '${typologie}' n'est pas une valeur admise`);
  }
}
