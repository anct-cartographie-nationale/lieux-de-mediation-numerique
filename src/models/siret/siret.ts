import { Model } from '../model';
import { SiretError } from './errors';

export type Siret = Model<'Siret', string>;

const throwSiretError = (siretNumber: string): Siret => {
  throw new SiretError(siretNumber);
};

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

export const isSiret = (siret: string): siret is Siret =>
  QUATORZE_CHIFFRES.test(siret) &&
  siret !== SENTINELLE_HISTORIQUE &&
  (siret.startsWith(SIREN_LA_POSTE) || cleDeLuhnValide(siret));

export const Siret = (siret: string): Siret => {
  const siretSansEspaces: string = siret.replace(/\s/gu, '');
  return isSiret(siretSansEspaces) ? siretSansEspaces : throwSiretError(siretSansEspaces);
};
