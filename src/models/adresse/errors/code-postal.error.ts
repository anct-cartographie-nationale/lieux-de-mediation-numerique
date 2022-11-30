import { ModelError } from '../../../errors';
import { Adresse } from '../adresse';

export class CodePostalError extends ModelError<Adresse> {
  constructor(codePostal: string) {
    super('code_postal', `Le code postal ${codePostal} n'est pas valide`);
  }
}
