import { describe, it, expect } from 'vitest';
import { Siret } from './siret';
import { SiretError } from './errors';

describe('siret model', (): void => {
  it('should create a valide siret', (): void => {
    const siret: Siret = Siret('12345678910111');

    expect(siret).toBe('12345678910111');
  });

  it('should throw SiretError if siret do no match required format', (): void => {
    expect((): void => {
      Siret('42');
    }).toThrow(new SiretError('42'));
  });

  it('should throw SiretError if siret contains spaces', (): void => {
    expect((): void => {
      Siret('842 887 408 00');
    }).toThrow(new SiretError('84288740800'));
  });
});
