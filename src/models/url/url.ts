import { z } from 'zod';
import { defineModel, type Model } from '../model';

const URL_REGEXP: RegExp =
  /^https?:\/\/(?:[;:&=+$,\w-]+@)?[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+(?:(?:\/[+~,%@/.\w_-]*)?\??[-+=&;%@.\w_]*#?[.!/\\\w]*)?$/u;

export const Url = defineModel(
  z.string().regex(URL_REGEXP, { error: "L'adresse doit être en http ou https, sur un hôte qui porte un domaine" }).brand('Url')
);

export type Url = Model.TypeOf<typeof Url>;
