import { z } from 'zod';
import { defineModel, type Model } from '../model';

export const URL_LONGUEUR_MAXIMALE = 2048;

const HOTE_AVEC_DOMAINE: RegExp = /^[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/u;

const IDENTIFIANTS_DANS_HOTE: RegExp = /^https?:\/\/[^/?#]*@/u;

const CARACTERES_INTERDITS: RegExp = /[\s"<>\\^`{|}]/u;

export const Url = defineModel(
  z
    .url({
      protocol: /^https?$/u,
      hostname: HOTE_AVEC_DOMAINE,
      error: "L'adresse doit être en http ou https, sur un hôte qui porte un domaine"
    })
    .max(URL_LONGUEUR_MAXIMALE, { error: `L'adresse doit faire au plus ${URL_LONGUEUR_MAXIMALE} caractères` })
    .refine((url: string): boolean => !IDENTIFIANTS_DANS_HOTE.test(url), {
      error: "L'adresse ne doit pas porter d'identifiants de connexion"
    })
    .refine((url: string): boolean => !CARACTERES_INTERDITS.test(url), {
      error: "L'adresse porte un caractère qu'une URL doit encoder"
    })
    .brand('Url')
);

export type Url = Model.TypeOf<typeof Url>;
