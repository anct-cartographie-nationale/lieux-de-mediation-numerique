import { Model } from '../model';
import { LabelsNationauxError } from './errors';

export enum LabelNational {
  AidantsConnect = 'Aidants Connect',
  APTIC = 'APTIC',
  CampusConnecte = 'Campus connecté',
  CNFS = 'CNFS',
  FabriquesDeTerritoire = 'Fabriques de Territoire',
  FranceServices = 'France Services',
  FrenchTech = 'French Tech',
  GrandesEcolesDuNumerique = 'Grandes écoles du numérique',
  PointNumeriqueCAF = 'Point numérique CAF',
  PointRelaisCAF = 'Point relais CAF',
  RelaisPoleEmploi = 'Relais pôle emploi'
}

export type LabelsNationaux = Model<'LabelsNationaux', LabelNational[]>;

export type LabelNationalIndefini = 'label national indéfini';

const firstInvalidLabelNational = (labelNational: LabelNational): boolean =>
  !Object.values(LabelNational).includes(labelNational);

const throwLabelsNationauxError = (labelsNationaux: LabelNational[]): LabelsNationaux => {
  throw new LabelsNationauxError(labelsNationaux.find(firstInvalidLabelNational) ?? 'label national indéfini');
};

const isLabelsNationaux = (labelsNationaux: LabelNational[]): labelsNationaux is LabelsNationaux =>
  labelsNationaux.find(firstInvalidLabelNational) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const LabelsNationaux = (labelsNationaux: LabelNational[]): LabelsNationaux =>
  isLabelsNationaux(labelsNationaux) ? labelsNationaux : throwLabelsNationauxError(labelsNationaux);
