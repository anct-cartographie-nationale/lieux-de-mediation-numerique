import { describe, it, expect } from 'vitest';
import { isValidFicheAccesLibre } from './fiche-acces-libre';

describe('isValidFicheAccesLibre', (): void => {
  it('should accept a fiche on acceslibre', (): void => {
    expect(isValidFicheAccesLibre('https://acceslibre.beta.gouv.fr/app/51-reims/a/x/')).toBe(true);
  });

  /**
   * Six des 305 fiches du jeu national pointaient ailleurs, dont l'une vers un site de partage
   * de photos, publiée comme fiche d'accessibilité.
   */
  it.each([['https://www.23hq.com/okcupid/photo/147204673'], ['https://example.fr'], ['pas une url']])(
    'should refuse %s, which is not an acceslibre fiche',
    (url: string): void => {
      expect(isValidFicheAccesLibre(url)).toBe(false);
    }
  );
});
