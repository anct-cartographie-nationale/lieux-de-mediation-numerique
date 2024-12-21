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
});
