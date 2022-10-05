import { OptionalPropertyError } from '../../../errors';

export class CourrielError extends OptionalPropertyError {
  constructor(courriel: string) {
    super('courriel', `Le courriel ${courriel} n'est pas valide`);
  }
}
