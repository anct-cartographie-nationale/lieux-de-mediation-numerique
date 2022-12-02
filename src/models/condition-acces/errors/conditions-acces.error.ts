import { ModelError } from '../../../errors';
import { ConditionAcces, ConditionsAccesIndefinie } from '../condition-acces';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class ConditionsAccesError extends ModelError<LieuMediationNumerique> {
  constructor(conditionsAcces: ConditionAcces | ConditionsAccesIndefinie) {
    super('conditions_acces', `La condition d'accès '${conditionsAcces}' n'est pas une valeur admise`);
  }
}
