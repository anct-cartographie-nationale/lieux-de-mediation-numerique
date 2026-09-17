import { describe, it, expect } from 'vitest';
import { Url } from './url';
import { UrlError } from './errors';

describe('url model', (): void => {
  it('should create a valid url', (): void => {
    const urlData: string = 'http://www.cartographienationale.fr';

    const url: Url = Url(urlData);

    expect(url).toStrictEqual(urlData as Url);
  });

  it('should throw UrlError when url do not have protocol neither extension', (): void => {
    const urlData: string = 'error';

    expect((): void => {
      Url(urlData);
    }).toThrow(new UrlError(urlData));
  });

  it('should throw UrlError when url do not have protocol', (): void => {
    const urlData: string = 'www.google.com';

    expect((): void => {
      Url(urlData);
    }).toThrow(new UrlError(urlData));
  });

  it('should throw accept url containing @', (): void => {
    const urlData: string = 'https://outlook.office365.com/book/HoudinDidier@laposte.onmicrosoft.com/?ismsaljsauthenabled=true';

    const url: Url = Url(urlData);

    expect(url).toStrictEqual(urlData as Url);
  });

  it.each([['htpps://example.fr'], ['htthttp://example.fr'], ['httphttps://example.fr'], ['ftp://example.fr']])(
    'should refuse %s, whose protocol is not http',
    (url: string): void => {
      expect((): void => {
        Url(url);
      }).toThrow(new UrlError(url));
    }
  );

  it.each([['http://example.fr'], ['https://example.fr/page?a=1#b']])('should accept %s', (url: string): void => {
    expect(Url(url)).toBe(url);
  });
});
