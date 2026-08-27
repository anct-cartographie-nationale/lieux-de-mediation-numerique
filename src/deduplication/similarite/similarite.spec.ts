import { describe, it, expect } from 'vitest';
import { similarite } from './similarite';

describe('similarite', (): void => {
  it('should be total between two identical strings', (): void => {
    expect(similarite('mediatheque municipale', 'mediatheque municipale')).toBe(100);
  });

  it('should be total between two empty strings', (): void => {
    expect(similarite('', '')).toBe(100);
  });

  it('should be null when one string is empty', (): void => {
    expect(similarite('mediatheque', '')).toBe(0);
  });

  it('should be null between two strings without any common character', (): void => {
    expect(similarite('abc', 'xyz')).toBe(0);
  });

  it('should be symmetric', (): void => {
    expect(similarite('mediatheque de fleury', 'fleury mediatheque')).toBe(
      similarite('fleury mediatheque', 'mediatheque de fleury')
    );
  });

  it('should tolerate a missing character', (): void => {
    // 'mediatheque' contre 'mediathque' : 10 caractères communs sur 21.
    expect(similarite('mediatheque', 'mediathque')).toBe(95);
  });

  it('should decrease as the strings diverge', (): void => {
    const proche: number = similarite('ville de fleury', 'ville fleury');
    const lointain: number = similarite('ville de fleury', 'mediatheque de fleury');

    expect(proche).toBeGreaterThan(lointain);
  });
});
