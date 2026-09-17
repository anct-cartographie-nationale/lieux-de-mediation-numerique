import { Model } from '../model';
import { DispositifProgrammeNationalError } from './errors';

export enum DispositifProgrammeNational {
  AidantsConnect = 'Aidants Connect',
  BibliothequesNumeriqueDeReference = 'Bibliothèques numérique de référence',
  CertificationPIX = 'Certification PIX',
  ConseillersNumeriques = 'Conseillers numériques',
  EmmausConnect = 'Emmaüs Connect',
  FranceServices = 'France Services',
  GrandeEcoleDuNumerique = 'Grande école du numérique',
  LaCroixRouge = 'La Croix Rouge',
  PointNumeriqueCAF = "Point d'accès numérique CAF",
  PromeneursDuNet = 'Promeneurs du net',
  RelaisNumeriqueEmmausConnect = 'Relais numérique (Emmaüs Connect)'
}

export type DispositifProgrammesNationaux = Model<'DispositifProgrammesNationaux', DispositifProgrammeNational[]>;

export type DispositifProgrammeNationalIndefini = 'dispositif ou programme national indéfini';

const firstInvalidDispositifProgrammeNational = (dispositifProgrammeNational: DispositifProgrammeNational): boolean =>
  !Object.values(DispositifProgrammeNational).includes(dispositifProgrammeNational);

const throwDispositifProgrammesNationauxError = (
  dispositifProgrammesNationaux: DispositifProgrammeNational[]
): DispositifProgrammesNationaux => {
  throw new DispositifProgrammeNationalError(
    dispositifProgrammesNationaux.find(firstInvalidDispositifProgrammeNational) ?? 'dispositif ou programme national indéfini'
  );
};

const isDispositifProgrammesNationaux = (
  dispositifProgrammesNationaux: DispositifProgrammeNational[]
): dispositifProgrammesNationaux is DispositifProgrammesNationaux =>
  dispositifProgrammesNationaux.find(firstInvalidDispositifProgrammeNational) == null;

/**
 * Les doublons tombent à la construction. La bibliothèque ne dédupliquait que `Services` et
 * `ModalitesAccompagnement` — un écart qui ne tenait qu'à l'ordre dans lequel les modèles ont
 * été écrits, et qui finissait par surprendre.
 */
export const DispositifProgrammesNationaux = (
  dispositifProgrammesNationaux: DispositifProgrammeNational[]
): DispositifProgrammesNationaux => {
  const sansDoublons: DispositifProgrammeNational[] = Array.from(new Set(dispositifProgrammesNationaux));

  return isDispositifProgrammesNationaux(sansDoublons)
    ? (sansDoublons as DispositifProgrammesNationaux)
    : throwDispositifProgrammesNationauxError(dispositifProgrammesNationaux);
};
