import { ModelError } from '../../../errors';
import type { Adresse } from '../adresse';

export class VoieError extends ModelError<Adresse> {
  constructor(voie: string) {
    super('voie', `La voie ${voie} n'est pas valide`);
  }
}
