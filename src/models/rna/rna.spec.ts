import { Rna, RnaError } from './rna';

describe('rna model', (): void => {
  it('should create a valide rna', (): void => {
    const rna: Rna = Rna('W9R2003255');

    expect(rna).toBe('W9R2003255');
  });

  it('should throw RnaError if rna do no match required format', (): void => {
    expect((): void => {
      Rna('42');
    }).toThrow(new RnaError('42'));
  });
});
