import { z } from 'zod';
import { defineModel, type Model } from '../model';

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

const SIREN_LA_POSTE = '356000000';

const SENTINELLE_HISTORIQUE = '00000000000000';

const QUATORZE_CHIFFRES: RegExp = /^\d{14}$/u;

const ESPACES: RegExp = /\s/gu;

export const Siret = defineModel(
  z
    .string()

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
