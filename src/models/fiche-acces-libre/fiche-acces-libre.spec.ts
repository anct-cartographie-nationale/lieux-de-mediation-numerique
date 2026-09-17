import { describe, expect, it } from 'vitest';
import { FicheAccesLibre } from './fiche-acces-libre';

describe('fiche acces libre model', (): void => {
  it('accepte une fiche publiée sur acceslibre', (): void => {
    expect(FicheAccesLibre('https://acceslibre.beta.gouv.fr/app/51-reims/a/x/')).toBe(
      'https://acceslibre.beta.gouv.fr/app/51-reims/a/x/'
    );
  });

  it.each([['https://www.23hq.com/okcupid/photo/147204673'], ['https://example.fr'], ['pas une url']])(
    'refuse %s, qui n’est pas une fiche acceslibre',
    (url: string): void => {
      expect(FicheAccesLibre.safe(url)).toBeNull();
    }
  );
});
