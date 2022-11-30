import { ModelError } from '../../../errors';

export class SiretError extends ModelError<{ siret: string }> {
  constructor(siret: string) {
    super('siret', `Le Siret ${siret} n'est pas valide`);
  }
}
