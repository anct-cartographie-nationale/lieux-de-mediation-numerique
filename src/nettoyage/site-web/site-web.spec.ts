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

  /** Les trois formes que le jeu national publiait, et que mednum-cli ne savait que préfixer. */
  it.each([
    ['htpps://example.fr', 'https://example.fr'],
    ['httphttps://cemea-pdll.org/', 'https://cemea-pdll.org/'],
    ['htthttp://www.citedulivre-aix.com', 'http://www.citedulivre-aix.com']
  ])('should repair the misspelled protocol of %s', (avant: string, apres: string): void => {
    expect(nettoyerSiteWeb(avant)).toBe(apres);
  });

  /**
   * `ftp` n'est pas un `http` mal tapé. Le réparer masquerait une adresse que la validation
   * doit refuser : le champ ne désigne qu'un site web.
   */
  it('should not turn another protocol into http', (): void => {
    expect(nettoyerSiteWeb('ftp://example.fr')).toBe('http://ftp://example.fr');
  });

  it('should never throw', (): void => {
    expect(nettoyerSiteWeb('')).toBe('http://');
  });
});
