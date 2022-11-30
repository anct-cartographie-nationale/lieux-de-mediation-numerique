import { ModelError } from '../../../errors';

export class RnaError extends ModelError<{ rna: string }> {
  constructor(rna: string) {
    super('rna', `Le Rna ${rna} n'est pas valide`);
  }
}
