import { Model } from '../model';
import { UrlError } from './errors';

/**
 * Le motif d'origine acceptait n'importe quel « protocole » de trois à neuf lettres suivi de
 * deux points, ce qui laissait passer `htpps://` et `httphttps://` — quatre adresses du jeu
 * national étaient publiées ainsi, renvoyant les visiteurs vers rien. Un lieu de médiation n'a
 * de site ni en `ftp:` ni en `gopher:`.
 */
const URL_REGEXP: RegExp =
  /^https?:\/\/(?:[;:&=+$,\w-]+@)?[A-Za-z0-9.-]+(?:(?:\/[+~,%@/.\w_-]*)?\??[-+=&;%@.\w_]*#?[.!/\\\w]*)?$/u;

export type Url = Model<'Url', string>;

const throwUrlError = (url: string): Url => {
  throw new UrlError(url);
};

export const isValidUrl = (url: string): url is Url => URL_REGEXP.test(url);

export const Url = (url: string): Url => (isValidUrl(url) ? url : throwUrlError(url));
