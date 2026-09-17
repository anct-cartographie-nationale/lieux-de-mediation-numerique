import { describe, it, expect } from 'vitest';
import { nettoyerCommune } from './commune';

describe('nettoyerCommune', (): void => {
  it('should expand an abbreviated Saint', (): void => {
    expect(nettoyerCommune('St-Denis')).toBe('Saint-Denis');
    expect(nettoyerCommune('Ste-Marie')).toBe('Sainte-Marie');
    expect(nettoyerCommune('Villeneuve St Georges')).toBe('Villeneuve-Saint-Georges');
  });

  it('should drop a parenthesised precision', (): void => {
    expect(nettoyerCommune('Sainte-Marie (Réunion)')).toBe('Sainte-Marie');
  });

  it('should drop a CEDEX mention', (): void => {
    expect(nettoyerCommune('PARIS CEDEX 12')).toBe('PARIS');
  });

  it('should drop the district number', (): void => {
    expect(nettoyerCommune('Paris 15e')).toBe('Paris');
  });

  it('should turn spaces into dashes, as the reference does', (): void => {
    expect(nettoyerCommune('Aix en Provence')).toBe('Aix-en-Provence');
  });

  it('should repair an apostrophe and the space that follows it', (): void => {
    expect(nettoyerCommune("L' Haÿ-les-Roses")).toBe("L'Haÿ-les-Roses");
  });

  it('should trim', (): void => {
    expect(nettoyerCommune('  Nice  ')).toBe('Nice');
  });

  it('should never throw', (): void => {
    expect(nettoyerCommune('')).toBe('');
  });
});
