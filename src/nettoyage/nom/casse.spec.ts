import { describe, it, expect } from 'vitest';
import { enCasseNaturelle } from './casse';

describe('enCasseNaturelle', (): void => {
  it('should turn an all caps denomination into title case', (): void => {
    expect(enCasseNaturelle('SECOURS POPULAIRE')).toBe('Secours Populaire');
    expect(enCasseNaturelle('MONCHY SAINT ELOI')).toBe('Monchy Saint Eloi');
  });

  it('should keep an acronym the schema knows', (): void => {
    expect(enCasseNaturelle('CCAS DE LYON')).toBe('CCAS de Lyon');
    expect(enCasseNaturelle('MJC DE BEAUNE')).toBe('MJC de Beaune');
    expect(enCasseNaturelle('EPN DES HAUTS')).toBe('EPN des Hauts');
  });

  it('should lowercase linking words, inside a hyphenated name too', (): void => {
    expect(enCasseNaturelle('ASSOCIATION DES AMIS')).toBe('Association des Amis');
    expect(enCasseNaturelle('SAINT-JEAN-DE-LUZ')).toBe('Saint-Jean-de-Luz');
  });

  it('should leave a denomination that already carries lowercase untouched', (): void => {
    expect(enCasseNaturelle('Médiathèque Jean Moulin')).toBe('Médiathèque Jean Moulin');
  });

  it('should capitalise an acronym it does not know', (): void => {
    expect(enCasseNaturelle('ADF')).toBe('Adf');
  });
});
