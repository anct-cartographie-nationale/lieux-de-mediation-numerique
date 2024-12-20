import { Model } from '../model';
import { UrlError } from './errors';

const URL_REGEXP: RegExp =
  /^[A-Za-z]{3,9}:(?:\/\/)?(?:[;:&=+$,\w-]+@)?[A-Za-z0-9.-]+(?:(?:\/[+~,%/.\w_-]*)?\??[-+=&;%@.\w_]*#?[.!/\\\w]*)?$/u;

export type Url = Model<'Url', string>;

const throwUrlError = (url: string): Url => {
  throw new UrlError(url);
};

export const isValidUrl = (url: string): url is Url => URL_REGEXP.test(url);

export const Url = (url: string): Url => (isValidUrl(url) ? url : throwUrlError(url));
