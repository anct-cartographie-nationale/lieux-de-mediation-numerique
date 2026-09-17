import { describe, it, expect } from 'vitest';
import { nettoyerNom } from './nom';

describe('nettoyerNom', (): void => {
  it('should trim and collapse spaces', (): void => {
    expect(nettoyerNom('  Xertithèque  ')).toBe('Xertithèque');
    expect(nettoyerNom('Mediatheque  Municipale')).toBe('Mediatheque Municipale');
  });

  it('should drop straight quotes, which break delimited formats', (): void => {
    expect(nettoyerNom('Nom avec "guillemets"')).toBe('Nom avec guillemets');
  });

  it('should turn line breaks into a space', (): void => {
    expect(nettoyerNom('ligne1\nligne2')).toBe('ligne1 ligne2');
  });

  it('should leave a clean name untouched', (): void => {
    expect(nettoyerNom('Médiathèque Jean Moulin')).toBe('Médiathèque Jean Moulin');
  });

  it('should never throw', (): void => {
    expect(nettoyerNom('')).toBe('');
  });
});
