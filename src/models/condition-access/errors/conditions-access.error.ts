import { ConditionAccess, ConditionsAccessIndefinie } from '../condition-access';

export class ConditionsAccessError extends Error {
  constructor(conditionsAccess: ConditionAccess | ConditionsAccessIndefinie) {
    super(`La condition d'accès '${conditionsAccess}' n'est pas une valeur admise`);
  }
}
