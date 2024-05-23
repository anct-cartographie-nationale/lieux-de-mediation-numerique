import { Model } from '../model';
import { PublicsSpecifiquementAdressesError } from './errors';

export enum PublicSpecifiquementAdresse {
  Jeunes = 'Jeunes',
  Etudiants = 'Étudiants',
  FamillesEnfants = 'Familles et/ou enfants',
  Seniors = 'Seniors',
  Femmes = 'Femmes'
}

export type PublicsSpecifiquementAdresses = Model<'PublicsSpecifiquementAdresses', PublicSpecifiquementAdresse[]>;

export type PublicSpecifiquementAdresseIndefini = 'public spécifiquement adressé indéfini';

const firstInvalidPublicSpecifiquementAdresse = (publicSpecifiquementAdresse: PublicSpecifiquementAdresse): boolean =>
  !Object.values(PublicSpecifiquementAdresse).includes(publicSpecifiquementAdresse);

const throwPublicsSpecifiquementAdressesError = (
  publicsSpecifiquementAdresses: PublicSpecifiquementAdresse[]
): PublicsSpecifiquementAdresses => {
  throw new PublicsSpecifiquementAdressesError(
    publicsSpecifiquementAdresses.find(firstInvalidPublicSpecifiquementAdresse) ?? 'public spécifiquement adressé indéfini'
  );
};

const isPublicsSpecifiquementAdresses = (
  publicsSpecifiquementAdresses: PublicSpecifiquementAdresse[]
): publicsSpecifiquementAdresses is PublicsSpecifiquementAdresses =>
  publicsSpecifiquementAdresses.find(firstInvalidPublicSpecifiquementAdresse) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const PublicsSpecifiquementAdresses = (
  publicsSpecifiquementAdresses: PublicSpecifiquementAdresse[]
): PublicsSpecifiquementAdresses =>
  isPublicsSpecifiquementAdresses(publicsSpecifiquementAdresses)
    ? (publicsSpecifiquementAdresses as PublicsSpecifiquementAdresses)
    : throwPublicsSpecifiquementAdressesError(publicsSpecifiquementAdresses);
