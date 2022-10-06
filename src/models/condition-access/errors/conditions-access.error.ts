import { OptionalPropertyError } from '../../../errors';
import { ConditionAccess, ConditionsAccessIndefinie } from '../condition-access';

export class ConditionsAccessError extends OptionalPropertyError {
  constructor(conditionsAccess: ConditionAccess | ConditionsAccessIndefinie) {
    super('conditions_access', `La condition d'accès '${conditionsAccess}' n'est pas une valeur admise`);
  }
}
