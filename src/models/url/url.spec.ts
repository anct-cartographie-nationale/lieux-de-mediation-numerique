import { describe, expect, it } from 'vitest';
import { Url } from './url';

describe('url model', (): void => {
  it('construit une url valide', (): void => {
    const url: Url = Url('http://www.cartographienationale.fr');

    expect(url).toBe('http://www.cartographienationale.fr');
  });

  it('refuse une adresse sans protocole ni extension', (): void => {
    expect(Url.safe('error')).toBeNull();
  });

  it('refuse une adresse sans protocole', (): void => {
    expect(Url.safe('www.google.com')).toBeNull();
  });

  it('accepte une adresse qui contient une arobase', (): void => {
    const urlData = 'https://outlook.office365.com/book/HoudinDidier@laposte.onmicrosoft.com/?ismsaljsauthenabled=true';

    expect(Url(urlData)).toBe(urlData);
  });

  it.each([['htpps://example.fr'], ['htthttp://example.fr'], ['httphttps://example.fr'], ['ftp://example.fr']])(
    'refuse %s, dont le protocole n’est pas http',
    (url: string): void => {
      expect(Url.safe(url)).toBeNull();
    }
  );

  it.each([['http://example.fr'], ['https://example.fr/page?a=1#b']])('accepte %s', (url: string): void => {
    expect(Url(url)).toBe(url);
  });

  it.each([['http://www'], ['https://w'], ['https://www/carct.fr'], ['https://example'], ['https://www.']])(
    'refuse %s, dont l’hôte ne porte pas de domaine',
    (url: string): void => {
      expect(Url.safe(url)).toBeNull();
    }
  );
});
