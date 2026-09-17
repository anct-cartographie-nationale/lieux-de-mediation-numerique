import { z } from 'zod';
import { defineModel, type Model } from '../model';

export const COURRIEL_LONGUEUR_MAXIMALE = 254;
export const PARTIE_LOCALE_LONGUEUR_MAXIMALE = 64;

const PARTIE_LOCALE = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*";
const ETIQUETTE = '[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?';
const DOMAINE = `${ETIQUETTE}(?:\\.${ETIQUETTE})*\\.[A-Za-z]{2,63}`;

const COURRIEL_REG_EXP: RegExp = new RegExp(`^${PARTIE_LOCALE}@${DOMAINE}$`, 'u');

const partieLocaleAdmissible = (courriel: string): boolean =>
  (courriel.split('@')[0]?.length ?? 0) <= PARTIE_LOCALE_LONGUEUR_MAXIMALE;

export const Courriel = defineModel(
  z
    .string()
    .max(COURRIEL_LONGUEUR_MAXIMALE, {
      error: `L'adresse électronique doit faire au plus ${COURRIEL_LONGUEUR_MAXIMALE} caractères`
    })
    .regex(COURRIEL_REG_EXP, { error: "L'adresse électronique n'est pas reconnue" })
    .refine(partieLocaleAdmissible, {
      error: `La partie locale doit faire au plus ${PARTIE_LOCALE_LONGUEUR_MAXIMALE} caractères`
    })
    .brand('Courriel')
);

export type Courriel = Model.TypeOf<typeof Courriel>;
