import { describe, expect, it } from 'vitest';
import { Courriel } from './courriel';

describe('courriel model', (): void => {
  it('construit un courriel valide', (): void => {
    const courriel: Courriel = Courriel('test@gmail.com');

    expect(courriel).toBe('test@gmail.com');
  });

  it('refuse une adresse sans extension de domaine', (): void => {
    expect(Courriel.safe('test@gmail')).toBeNull();
  });

  it('refuse une adresse sans arobase', (): void => {
    expect(Courriel.safe('contact example.fr')).toBeNull();
  });
});
