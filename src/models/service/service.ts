import { Model } from '../model';
import { ServicesError } from './errors';

export enum Service {
  AccederADuMateriel = 'Accéder à du matériel',
  AccederAUneConnexionInternet = 'Accéder à une connexion internet',
  AccompagnerLesDemarchesDeSante = 'Accompagner les démarches de santé',
  ApprofondirMaCultureNumerique = 'Approfondir ma culture numérique',
  CreerAvecLeNumerique = 'Créer avec le numérique',
  CreerEtDevelopperMonEntreprise = 'Créer et développer mon entreprise',
  DevenirAutonomeDansLesDemarchesAdministratives = 'Devenir autonome dans les démarches administratives',
  FavoriserMonInsertionProfessionnelle = 'Favoriser mon insertion professionnelle',
  PrendreEnMainUnOrdinateur = 'Prendre en main un ordinateur',
  PrendreEnMainUnSmartphoneOuUneTablette = 'Prendre en main un smartphone ou une tablette',
  PromouvoirLaCitoyenneteNumerique = 'Promouvoir la citoyenneté numérique',
  RealiserDesDemarchesAdministratives = 'Réaliser des démarches administratives avec un accompagnement',
  EquiperEnMaterielInformatique = 'S’équiper en matériel informatique',
  UtiliserLeNumerique = 'Utiliser le numérique au quotidien',
  SoutenirLaParentalite = "Soutenir la parentalité et l'éducation avec le numérique"
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
  isServices(services) ? (services as Services) : throwServicesError(services);
