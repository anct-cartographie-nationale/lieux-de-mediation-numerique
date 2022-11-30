import { ModelError } from '../../../errors';
import { Adresse } from '../adresse';

export class CodeInseeError extends ModelError<Adresse> {
  constructor(codeInsee: string) {
    super('code_insee', `Le code insee ${codeInsee} n'est pas valide`);
  }
}
