import { OptionalPropertyError } from '../../../errors';
import { Typologie, TypologiesIndefinie } from '../typologie';

export class TypologiesError extends OptionalPropertyError {
  constructor(typologie: Typologie | TypologiesIndefinie) {
    super('typologie', `La typologie '${typologie}' n'est pas une valeur admise`);
  }
}
