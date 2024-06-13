import { ModelError } from '../../../errors';

export class RidetError extends ModelError<{ ridet: string }> {
  constructor(ridet: string) {
    super('ridet', `Le Ridet ${ridet} n'est pas valide`);
  }
}
