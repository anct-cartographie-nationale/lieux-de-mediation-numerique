import { z } from 'zod';
import { defineModel, type Model } from '../model';

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

export const Url = defineModel(
  z.string().regex(URL_REGEXP, { error: "L'adresse doit être en http ou https, sur un hôte qui porte un domaine" }).brand('Url')
);

export type Url = Model.TypeOf<typeof Url>;
