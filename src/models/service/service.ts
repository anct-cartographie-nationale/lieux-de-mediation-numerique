import { Model } from '../model';
import { ServicesError } from './errors';

export enum Service {
  MaterielInformatiqueAPrixSolidaire = 'Acquisition de matériel informatique à prix solidaire',
  AideAuxDemarchesAdministratives = 'Aide aux démarches administratives',
  MaitriseDesOutilsNumeriquesDuQuotidien = 'Maîtrise des outils numériques du quotidien',
  InsertionProfessionnelleViaLeNumerique = 'Insertion professionnelle via le numérique',
  UtilisationSecuriseeDuNumerique = 'Utilisation sécurisée du numérique',
  ParentaliteEtEducationAvecLeNumerique = 'Parentalité et éducation avec le numérique',
  LoisirsEtCreationsNumeriques = 'Loisirs et créations numériques',
  ComprehensionDuMondeNumerique = 'Compréhension du monde numérique',
  AccesInternetEtMaterielInformatique = 'Accès internet et matériel informatique'
}

export type Services = Model<'Services', Service[]>;

export type ServiceIndefini = 'service indéfini';

const firstInvalidService = (service: Service): boolean => !Object.values(Service).includes(service);

const throwServicesError = (services: Service[]): Services => {
  throw new ServicesError(services.find(firstInvalidService) ?? 'service indéfini');
};

const isServices = (services: Service[]): services is Services =>
  services.length > 0 && services.find(firstInvalidService) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Services = (services: Service[]): Services =>
  isServices(services) ? (Array.from(new Set(services)) as Services) : throwServicesError(services);
