import { ModelError } from '../../../errors';
import { Contact } from '../contact';

export class CourrielError extends ModelError<Contact> {
  constructor(courriel: string) {
    super('courriel', `Le courriel ${courriel} n'est pas valide`);
  }
}
