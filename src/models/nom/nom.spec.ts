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

  it('refuse un nom fait d’espaces', (): void => {
    expect(Nom.safe('   ')).toBeNull();
  });

  it('ne rogne pas les espaces de bord, qui relèvent du nettoyage', (): void => {
    expect(Nom(' Anonymal ')).toBe(' Anonymal ');
  });
});
