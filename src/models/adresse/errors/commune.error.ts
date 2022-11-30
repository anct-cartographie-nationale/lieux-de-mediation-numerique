import { ModelError } from '../../../errors';
import { Adresse } from '../adresse';

export class CommuneError extends ModelError<Adresse> {
  constructor(commune: string) {
    super('commune', `La commune ${commune} n'est pas valide`);
  }
}
