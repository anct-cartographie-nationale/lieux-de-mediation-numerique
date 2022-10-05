import { Model } from '../model';

const URL_REGEXP: RegExp =
  /[A-Za-z]{3,9}:(?:\/\/)?(?:[;:&=+$,\w-]+@)?[A-Za-z0-9.-]+|(?:www\.|[;:&=+$,\w-]+@)[A-Za-z0-9.-]+(?:(?:\/[+~%/.\w_-]*)?\??[-+=&;%@.\w_]*#?[.!/\\\w]*)?/u;

export class UrlError extends Error {
  constructor(url: string) {
    super(`Le format de l'url ${url} n'est pas valide`);
  }
}

export type Url = Model<'Url', string>;

const throwUrlError = (url: string): Url => {
  throw new UrlError(url);
};

const isValidUrl = (url: string): boolean => URL_REGEXP.test(url);

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Url = (url: string): Url => (isValidUrl(url) ? (url as Url) : throwUrlError(url));
