import { describe, it, expect } from 'vitest';
import { libelleSansIdentite, normaliserAdresse, normaliserNom } from './normalisation';

describe('normaliserNom', (): void => {
  it('should ignore case, accents and punctuation', (): void => {
    expect(normaliserNom('MAIRIE DU PRÊCHEUR')).toBe(normaliserNom('Mairie du Precheur'));
  });

  it('should make town hall denominations equivalent', (): void => {
    expect(normaliserNom('Commune de Fleury')).toBe('ville fleury');
    expect(normaliserNom('Mairie de Fleury')).toBe('ville fleury');
    expect(normaliserNom('Hôtel de ville de Fleury')).toBe('ville fleury');
    expect(normaliserNom('Ville de Fleury')).toBe('ville fleury');
  });

  it('should make departement denominations equivalent', (): void => {
    expect(normaliserNom('Conseil départemental du Rhône')).toBe(normaliserNom('Département du Rhône'));
  });

  it('should keep a denomination that carries no administrative prefix', (): void => {
    expect(normaliserNom('Médiathèque Jean Moulin')).toBe('mediatheque jean moulin');
  });
});

describe('normaliserAdresse', (): void => {
  it('should ignore case, accents and punctuation', (): void => {
    expect(normaliserAdresse('1, Place du Général de Gaulle')).toBe('1 place du general de gaulle');
  });
});

describe('libelleSansIdentite', (): void => {
  it.each([['[Non diffusible]'], ['NON DIFFUSIBLE'], ['Non communiqué'], ['inconnu'], [''], ['   '], ['---']])(
    'should recognise %s as designating nothing',
    (libelle: string): void => {
      expect(libelleSansIdentite(libelle)).toBe(true);
    }
  );

  it('should recognise an actual denomination', (): void => {
    expect(libelleSansIdentite('Médiathèque de Fleury')).toBe(false);
  });
});
