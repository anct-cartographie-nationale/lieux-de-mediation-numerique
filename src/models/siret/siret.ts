import { z } from 'zod';
import { defineModel, type Model } from '../model';

/**
 * La formule de Luhn : chaque chiffre de rang pair en partant de la fin est doublé, un résultat
 * à deux chiffres est ramené en dessous de dix, et la somme doit être un multiple de dix. C'est
 * la clé de contrôle que porte tout SIRET.
 */
const cleDeLuhnValide = (chiffres: string): boolean =>
  [...chiffres]
    .reverse()
    .map((chiffre: string, rang: number): number => {
      const double: number = Number.parseInt(chiffre, 10) * (rang % 2 === 1 ? 2 : 1);
      return double > 9 ? double - 9 : double;
    })
    .reduce((somme: number, chiffre: number): number => somme + chiffre, 0) %
    10 ===
  0;

/**
 * La Poste immatricule ses établissements sous des SIRET qui ne respectent pas la clé de
 * contrôle. Sans cette exemption, ce sont cent trente-neuf lieux du jeu national qui perdent
 * leur pivot au lieu de quatre.
 */
const SIREN_LA_POSTE = '356000000';

/**
 * Quatorze zéros passent la clé de Luhn — leur somme est nulle, donc multiple de dix — et ont
 * longtemps tenu lieu de pivot absent : sept lignes sur dix du jeu national. Il faut donc les
 * refuser nommément, la clé ne s'en chargeant pas.
 */
const SENTINELLE_HISTORIQUE = '00000000000000';

const QUATORZE_CHIFFRES: RegExp = /^\d{14}$/u;

const ESPACES: RegExp = /\s/gu;

export const Siret = defineModel(
  z
    .string()
    /** Les sources écrivent `842 887 408 00018` ; le SIRET, lui, n'a pas d'espaces. */
    .transform((siret: string): string => siret.replace(ESPACES, ''))
    .refine(
      (siret: string): boolean =>
        QUATORZE_CHIFFRES.test(siret) &&
        siret !== SENTINELLE_HISTORIQUE &&
        (siret.startsWith(SIREN_LA_POSTE) || cleDeLuhnValide(siret)),
      { error: 'Le SIRET doit être composé de 14 chiffres et respecter sa clé de contrôle' }
    )
    .brand('Siret')
);

export type Siret = Model.TypeOf<typeof Siret>;
