import { ModelError } from '../../../errors';

export class CourrielError extends ModelError<{ courriel: string }> {
  constructor(courriel: string) {
    super('courriel', `Le courriel ${courriel} n'est pas valide`);
  }
}
