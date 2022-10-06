import { ConditionAccess } from '../condition-access';

export class ConditionsAccessError extends Error {
  constructor(conditionsAccess: ConditionAccess) {
    super(`La condition d'accès '${conditionsAccess}' n'est pas une valeur admise`);
  }
}
