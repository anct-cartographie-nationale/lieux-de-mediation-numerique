import { OptionalPropertyError } from '../../../errors';

export class CodePostalError extends OptionalPropertyError {
  constructor(codePostal: string) {
    super('codePostal', `Le code postal ${codePostal} n'est pas valide`);
  }
}
