import type { Model } from '../model';
import { CodeInseeError, CodePostalError, CommuneError, VoieError } from './errors';

/** La forme, telle qu'on l'écrit avant de la faire valider. */
export type AdresseToValidate = {
  voie: string;
  complement_adresse?: string;
  code_postal: string;
  code_insee?: string;
  commune: string;
};

/** Une valeur dont le constructeur a vérifié chaque partie. */
export type Adresse = Model<'Adresse', AdresseToValidate>;

const CODE_POSTAL_REG_EXP: RegExp = /^\d{5}$/u;

/**
 * Le code officiel géographique de l'INSEE, sur cinq caractères :
 * - métropole : département sur deux caractères (01-19, 21-95), commune sur trois ;
 * - Corse : `2A` et `2B`, le code `20` d'avant 1976 étant exclu ;
 * - outre-mer : département ou collectivité sur trois caractères (971-978 pour les DOM et
 *   collectivités, 981-989 pour les territoires), commune sur deux.
 *
 * Vérifié contre les 18730 codes du jeu national, qu'il accepte tous, et contre les cas
 * absents de ce jeu mais légitimes : `97701` Saint-Barthélemy, `98818` Nouvelle-Calédonie,
 * `98735` Polynésie, et les arrondissements `75101`, `69381`, `13201`.
 */
const CODE_INSEE_REG_EXP: RegExp = /^(?:(?:0[1-9]|1\d|2[AB]|2[1-9]|[3-8]\d|9[0-5])\d{3}|(?:97[1-8]|98[1-9])\d{2})$/u;

const COMMUNE_REG_EXP: RegExp = /^[A-Za-z\dÀ-ÖØ-öø-ÿœ-ŸŒ\-'’\s]+$/u;

const VOIE_REG_EXP: RegExp = /^[0-9A-Za-z\dÀ-ÖØ-öø-ÿœ-ŸŒ\-,()°.&:+–|;'’/\s]+$/u;

export const isValidCodePostal = (codePostal: string): boolean => CODE_POSTAL_REG_EXP.test(codePostal);

export const isValidCodeInsee = (codeInsee: string): boolean => CODE_INSEE_REG_EXP.test(codeInsee);

export const isValidCommune = (commune: string): boolean => COMMUNE_REG_EXP.test(commune);

export const isValidVoie = (voie: string): boolean => voie.length > 0 && VOIE_REG_EXP.test(voie);

export const isValidAddress = (adresse: AdresseToValidate): adresse is Adresse =>
  isValidVoie(adresse.voie) &&
  isValidCodePostal(adresse.code_postal) &&
  (adresse.code_insee == null || isValidCodeInsee(adresse.code_insee)) &&
  isValidCommune(adresse.commune);

const throwAdresseError = (adresse: AdresseToValidate): Adresse => {
  if (!isValidVoie(adresse.voie)) throw new VoieError(adresse.voie);
  if (!isValidCodePostal(adresse.code_postal)) throw new CodePostalError(adresse.code_postal);
  if (adresse.code_insee != null && !isValidCodeInsee(adresse.code_insee)) throw new CodeInseeError(adresse.code_insee);
  if (!isValidCommune(adresse.commune)) throw new CommuneError(adresse.commune);

  throw new Error();
};

export const Adresse = (adresse: AdresseToValidate): Adresse =>
  isValidAddress(adresse) ? { ...adresse } : throwAdresseError(adresse);
