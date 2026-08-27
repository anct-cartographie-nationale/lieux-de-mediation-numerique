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

describe('normaliserNom — abréviations', (): void => {
  it.each([
    ['St Denis', 'saint deni'],
    ['Ste Marie', 'sainte marie'],
    ['Ctre social des Sablons', 'centre social des sablon'],
    ['Asso Trait d’Union', 'association trait d union'],
    ['ASS Les Amis', 'association les amis']
  ])('should expand abbreviations in %s', (nom: string, attendu: string): void => {
    expect(normaliserNom(nom)).toBe(attendu);
  });

  it('should bring an abbreviated and a spelled out denomination together', (): void => {
    expect(normaliserNom('St Denis')).toBe(normaliserNom('Saint Denis'));
  });
});

describe('normaliserNom — désinflexion', (): void => {
  it.each([
    [['social', 'sociale', 'sociales'], 'social'],
    [['atelier', 'ateliers'], 'atelier'],
    [['service', 'services'], 'service'],
    [['commune', 'communes'], 'commune'],
    [['culturel', 'culturels', 'culturelle', 'culturelles'], 'culturel'],
    [['municipal', 'municipale', 'municipales'], 'municipal'],
    [['rurale', 'rurales'], 'rural'],
    [['solidarite', 'solidarites'], 'solidarite'],
    [['maison', 'maisons'], 'maison']
  ])('should bring %s to a single form', (formes: string[], attendue: string): void => {
    formes.forEach((forme: string): void => {
      expect(normaliserNom(forme)).toBe(attendue);
    });
  });

  it('should leave a short term untouched', (): void => {
    expect(normaliserNom('pays')).toBe('pays');
    expect(normaliserNom('bois')).toBe('bois');
  });

  it('should not strip a double s', (): void => {
    expect(normaliserNom('progress')).toBe('progress');
  });

  it('should also trim proper nouns, which costs nothing', (): void => {
    expect(normaliserNom('Saint-Denis')).toBe(normaliserNom('St Denis'));
    expect(normaliserNom('Paris')).toBe('pari');
  });

  it('should keep distinct words apart', (): void => {
    expect(normaliserNom('communal')).not.toBe(normaliserNom('commune'));
  });

  it('should preserve the canonical prefixes it is applied after', (): void => {
    expect(normaliserNom('Commune de Fleury')).toBe('ville fleury');
    expect(normaliserNom('Communauté de communes du Pays Sabolien')).toBe('cc du pays sabolien');
  });
});
