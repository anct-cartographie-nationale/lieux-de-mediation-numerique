import { describe, expect, it } from 'vitest';
import { Nom } from './nom';

describe('nom model', (): void => {
  it('construit un nom valide', (): void => {
    const nom: Nom = Nom('4cf5az948azc4z4');

    expect(nom).toBe('4cf5az948azc4z4');
  });

  it('refuse une valeur absente', (): void => {
    expect(Nom.safe(null as unknown as string)).toBeNull();
  });

  it('refuse un nom vide', (): void => {
    expect(Nom.safe('')).toBeNull();
  });

  /** Un nom fait d'espaces est un nom vide. */
  it('refuse un nom fait d’espaces', (): void => {
    expect(Nom.safe('   ')).toBeNull();
  });
});
