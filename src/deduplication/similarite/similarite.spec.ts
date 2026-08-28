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
    expect(similarite('mediatheque', 'mediathque')).toBe(95);
  });

  it('should decrease as the strings diverge', (): void => {
    const proche: number = similarite('ville de fleury', 'ville fleury');
    const lointain: number = similarite('ville de fleury', 'mediatheque de fleury');

    expect(proche).toBeGreaterThan(lointain);
  });
});

describe('similarite — bornée par l’écart absolu', (): void => {
  const unGabarit: string = 'moselle fibre ateliers organises a la mairie de launstroff';
  const leMemeGabarit: string = 'moselle fibre ateliers ponctuels organises a la mairie de montenach';

  it('should not let a shared boilerplate carry two unrelated names', (): void => {
    expect(similarite(unGabarit, leMemeGabarit)).toBeLessThan(similarite(unGabarit, unGabarit) - 30);
  });

  it('should still bring together two long names that differ by little', (): void => {
    expect(similarite('communaute de communes du pays sabolien', 'communaute de communes pays sabolien')).toBeGreaterThan(90);
  });

  it('should not punish a name for carrying an added qualifier', (): void => {
    const nu: string = 'maison departementale de proximite de montrejeau';
    const qualifie: string = 'maison departementale de proximite de montrejeau france services';

    expect(similarite(nu, qualifie)).toBeGreaterThan(70);
  });

  it('should leave short strings to the proportional measure', (): void => {
    expect(similarite('abc', 'xyz')).toBe(0);
  });

  it('should leave identical strings untouched whatever their length', (): void => {
    expect(similarite(unGabarit, unGabarit)).toBe(100);
  });

  it('should cap two texts by their edit distance, not by their length', (): void => {
    expect(similarite(unGabarit, leMemeGabarit)).toBeLessThan(similarite('mediatheque', 'mediathque'));
  });
});
