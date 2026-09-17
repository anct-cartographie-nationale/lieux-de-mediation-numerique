import { Model } from '../model';
import { UrlError } from './errors';

/**
 * Deux resserrements, chacun motivé par une adresse réellement publiée.
 *
 * **Le protocole est `http` ou `https`.** Le motif d'origine acceptait n'importe quel mot de
 * trois à neuf lettres suivi de deux points, ce qui a laissé passer `htpps://` et
 * `httphttps://` : quatre adresses du jeu national renvoyaient les visiteurs vers rien. Un
 * lieu de médiation n'a de site ni en `ftp:` ni en `gopher:`.
 *
 * **L'hôte porte un point.** Le jeu national publie aussi `http://www`, `https://w` et
 * `https://www/carct.fr`, adresses tronquées qui ne mènent nulle part.
 */
const URL_REGEXP: RegExp =
  /^https?:\/\/(?:[;:&=+$,\w-]+@)?[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+(?:(?:\/[+~,%@/.\w_-]*)?\??[-+=&;%@.\w_]*#?[.!/\\\w]*)?$/u;

export type Url = Model<'Url', string>;

const throwUrlError = (url: string): Url => {
  throw new UrlError(url);
};

export const isValidUrl = (url: string): url is Url => URL_REGEXP.test(url);

export const Url = (url: string): Url => (isValidUrl(url) ? url : throwUrlError(url));
