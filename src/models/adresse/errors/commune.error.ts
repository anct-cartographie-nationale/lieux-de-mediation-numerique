import { OptionalPropertyError } from '../../../errors';

export class CommuneError extends OptionalPropertyError {
  constructor(commune: string) {
    super('commune', `La commune ${commune} contient des caractères invalides`);
  }
}
