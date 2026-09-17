import type { Model } from '../model';
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

/**
 * Les doublons tombent à la construction. La bibliothèque ne dédupliquait que `Services` et
 * `ModalitesAccompagnement` — un écart qui ne tenait qu'à l'ordre dans lequel les modèles ont
 * été écrits, et qui finissait par surprendre.
 */
export const PublicsSpecifiquementAdresses = (
  publicsSpecifiquementAdresses: PublicSpecifiquementAdresse[]
): PublicsSpecifiquementAdresses => {
  const sansDoublons: PublicSpecifiquementAdresse[] = Array.from(new Set(publicsSpecifiquementAdresses));

  return isPublicsSpecifiquementAdresses(sansDoublons)
    ? (sansDoublons as PublicsSpecifiquementAdresses)
    : throwPublicsSpecifiquementAdressesError(publicsSpecifiquementAdresses);
};
