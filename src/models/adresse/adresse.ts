import { Model } from '../model';
import { CodeInseeError, CodePostalError, CommuneError, VoieError } from './errors';

export type Adresse = Model<
  'Adresse',
  {
    voie: string;
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    complement_adresse?: string;
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    code_postal: string;
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    code_insee?: string;
    commune: string;
  }
>;

export type AdresseToValidate = Omit<Adresse, 'isAdresse'>;

const CODE_POSTAL_REG_EXP: RegExp = /^\d{5}$/u;

const CODE_INSEE_REG_EXP: RegExp = /^(?:[013-9]\d|2[AB1-9])(?:0?\d{3}|-\d-\d{2}-\d{3})$/u;

const COMMUNE_REG_EXP: RegExp = /^[A-Za-z\dÀ-ÖØ-öø-ÿœ\-'’ ]+$/u;

const VOIE_REG_EXP: RegExp = /^[0-9A-Za-z\dÀ-ÖØ-öø-ÿœ\-,'’ ]+$/u;

const isValidCodePostal = (codePostal: string): boolean => CODE_POSTAL_REG_EXP.test(codePostal);

const isValidCodeInsee = (codeInsee: string): boolean => CODE_INSEE_REG_EXP.test(codeInsee);

const isValidCommune = (commune: string): boolean => COMMUNE_REG_EXP.test(commune);

const isValidVoie = (voie: string): boolean => voie.length > 0 && VOIE_REG_EXP.test(voie);

export const isValidAddress = (adresse: Omit<Adresse, 'isAdresse'>): adresse is Adresse =>
  isValidVoie(adresse.voie) &&
  isValidCodePostal(adresse.code_postal) &&
  (adresse.code_insee == null || isValidCodeInsee(adresse.code_insee)) &&
  isValidCommune(adresse.commune);

const throwAdresseError = (adresse: Omit<Adresse, 'isAdresse'>): Adresse => {
  if (!isValidVoie(adresse.voie)) throw new VoieError(adresse.voie);
  if (!isValidCodePostal(adresse.code_postal)) throw new CodePostalError(adresse.code_postal);
  if (adresse.code_insee != null && !isValidCodeInsee(adresse.code_insee)) throw new CodeInseeError(adresse.code_insee);
  if (!isValidCommune(adresse.commune)) throw new CommuneError(adresse.commune);

  throw new Error();
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Adresse = (adresse: AdresseToValidate): Adresse =>
  isValidAddress(adresse) ? { ...adresse } : throwAdresseError(adresse);
