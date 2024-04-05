import { Model } from '../model';
import { DispositifsProgrammesNationauxError } from './errors';

export enum DispositifProgrammeNational {
  AidantsConnect = 'Aidants Connect',
  BibliothequesNumeriqueDeReference = 'Bibliothèques numérique de référence',
  CertificationPix = 'Certification PIX',
  ConseillersNumeriques = 'Conseillers numériques',
  EmmausConnect = 'Emmaüs Connect',
  FranceServices = 'France Services',
  GrandesEcolesDuNumerique = 'Grandes écoles du numérique',
  LaCroixRouge = 'La Croix Rouge',
  PointAccesNumeriqueCAF = "Point d'accès numérique CAF",
  PromeneursDuNet = 'Promeneurs du net',
  RelaisNumerique = 'Relais numérique (Emmaüs Connect)'
}

export type DispositifsProgrammesNationaux = Model<'DispositifsProgrammesNationaux', DispositifProgrammeNational[]>;

export type DispositifProgrammeNationalIndefini = 'dispositif ou programme national indéfini';

const firstInvalidDispositifProgrammeNational = (dispositifProgrammeNational: DispositifProgrammeNational): boolean =>
  !Object.values(DispositifProgrammeNational).includes(dispositifProgrammeNational);

const throwDispositifsProgrammesNationauxError = (
  dispositifsProgrammesNationaux: DispositifProgrammeNational[]
): DispositifsProgrammesNationaux => {
  throw new DispositifsProgrammesNationauxError(
    dispositifsProgrammesNationaux.find(firstInvalidDispositifProgrammeNational) ?? 'dispositif ou programme national indéfini'
  );
};

const isDispositifsProgrammesNationaux = (
  dispositifsProgrammesNationaux: DispositifProgrammeNational[]
): dispositifsProgrammesNationaux is DispositifsProgrammesNationaux =>
  dispositifsProgrammesNationaux.find(firstInvalidDispositifProgrammeNational) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const DispositifsProgrammesNationaux = (
  dispositifsProgrammesNationaux: DispositifProgrammeNational[]
): DispositifsProgrammesNationaux =>
  isDispositifsProgrammesNationaux(dispositifsProgrammesNationaux)
    ? dispositifsProgrammesNationaux
    : throwDispositifsProgrammesNationauxError(dispositifsProgrammesNationaux);
