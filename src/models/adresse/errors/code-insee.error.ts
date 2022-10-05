import { OptionalPropertyError } from '../../../errors';

export class CodeInseeError extends OptionalPropertyError {
  constructor(codeInsee: string) {
    super('codeInsee', `Le code insee ${codeInsee} n'est pas valide`);
  }
}
