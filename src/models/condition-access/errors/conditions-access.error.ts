import { ModelError } from '../../../errors';
import { ConditionAccess, ConditionsAccessIndefinie } from '../condition-access';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class ConditionsAccessError extends ModelError<LieuMediationNumerique> {
  constructor(conditionsAccess: ConditionAccess | ConditionsAccessIndefinie) {
    super('conditions_access', `La condition d'accès '${conditionsAccess}' n'est pas une valeur admise`);
  }
}
