import { Url } from './url';
import { UrlError } from './errors';

describe('url model', (): void => {
  it('should create a valid url', (): void => {
    const urlData: string = 'http://www.cartographienationale.fr';

    const url: Url = Url(urlData);

    expect(url).toStrictEqual(urlData as Url);
  });

  it('should throw UrlError when url is invalid', (): void => {
    const urlData: string = 'error';

    expect((): void => {
      Url(urlData);
    }).toThrow(new UrlError(urlData));
  });
});
