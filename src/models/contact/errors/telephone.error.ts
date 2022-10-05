import { OptionalPropertyError } from '../../../errors';

export class TelephoneError extends OptionalPropertyError {
  constructor(telephone: string) {
    super('telephone', `Le telephone ${telephone} n'est pas valide`);
  }
}
