import { describe, it, expect } from 'vitest';
import { nettoyerCourriel } from './courriel';

describe('nettoyerCourriel', (): void => {
  it('should trim and drop a mailto prefix', (): void => {
    expect(nettoyerCourriel('  contact@example.fr  ')).toBe('contact@example.fr');
    expect(nettoyerCourriel('mailto:contact@example.fr')).toBe('contact@example.fr');
  });

  it('should repair a doubled at sign and a leading dot', (): void => {
    expect(nettoyerCourriel('contact@@example.fr')).toBe('contact@example.fr');
    expect(nettoyerCourriel('.contact@example.fr')).toBe('contact@example.fr');
  });

  it('should reveal an at sign hidden from harvesters', (): void => {
    expect(nettoyerCourriel('contact[a]example.fr')).toBe('contact@example.fr');
  });

  it('should drop accents, which an address does not carry', (): void => {
    expect(nettoyerCourriel('prénom@example.fr')).toBe('prenom@example.fr');
  });

  it('should unify separators on the pipe the national schema uses', (): void => {
    expect(nettoyerCourriel('a@example.fr et b@example.fr')).toBe('a@example.fr|b@example.fr');
    expect(nettoyerCourriel('a@example.fr;b@example.fr')).toBe('a@example.fr|b@example.fr');
  });

  /**
   * Comportement hérité de mednum-cli, conservé : la règle du libellé en tête prend « contact »
   * pour une étiquette et l'ôte. Le déménagement préserve le comportement ; le corriger est une
   * autre décision.
   */
  it('should mistake a word before a space for a label', (): void => {
    expect(nettoyerCourriel('contact @example.fr')).toBe('@example.fr');
  });

  it('should never throw', (): void => {
    expect(nettoyerCourriel('')).toBe('');
  });
});
