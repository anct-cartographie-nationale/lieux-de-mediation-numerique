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

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const DispositifProgrammesNationaux = (
  dispositifProgrammesNationaux: DispositifProgrammeNational[]
): DispositifProgrammesNationaux =>
  isDispositifProgrammesNationaux(dispositifProgrammesNationaux)
    ? dispositifProgrammesNationaux
    : throwDispositifProgrammesNationauxError(dispositifProgrammesNationaux);
