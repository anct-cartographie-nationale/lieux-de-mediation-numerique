import { describe, it, expect } from 'vitest';
import { nettoyerSiteWeb } from './site-web';

describe('nettoyerSiteWeb', (): void => {
  it('should add the missing protocol', (): void => {
    expect(nettoyerSiteWeb('www.example.fr')).toBe('http://www.example.fr');
  });

  it('should repair a mistyped protocol', (): void => {
    expect(nettoyerSiteWeb('https//:example.fr')).toBe('https://example.fr');
    expect(nettoyerSiteWeb('https//example.fr')).toBe('https://example.fr');
    expect(nettoyerSiteWeb('http:/example.fr')).toBe('http://example.fr');
    expect(nettoyerSiteWeb('http://http://example.fr')).toBe('https://example.fr');
  });

  it('should lowercase', (): void => {
    expect(nettoyerSiteWeb('EXAMPLE.FR')).toBe('http://example.fr');
  });

  it('should separate addresses that were stuck together', (): void => {
    expect(nettoyerSiteWeb('https://a.frhttps://b.fr')).toBe('https://a.fr|https://b.fr');
    expect(nettoyerSiteWeb('https://a.fr;https://b.fr')).toBe('https://a.fr|https://b.fr');
  });

  it('should encode parentheses', (): void => {
    expect(nettoyerSiteWeb('https://a.fr/page(1)')).toBe('https://a.fr/page%281%29');
  });

  /**
   * Comportement hérité de mednum-cli, conservé : un protocole mal orthographié ne ressemble pas
   * à `http`, donc la règle du protocole manquant en ajoute un devant. Le résultat reste
   * invalide — et la validation le refusera, ce qui est le comportement voulu.
   */
  it('should prefix a misspelled protocol instead of repairing it', (): void => {
    expect(nettoyerSiteWeb('htpps://example.fr')).toBe('http://htpps://example.fr');
  });

  it('should never throw', (): void => {
    expect(nettoyerSiteWeb('')).toBe('http://');
  });
});
