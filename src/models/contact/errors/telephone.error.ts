import { ModelError } from '../../../errors';
import type { Contact } from '../contact';

export class TelephoneError extends ModelError<Contact> {
  constructor(telephone: string) {
    super('telephone', `Le telephone ${telephone} n'est pas valide`);
  }
}
