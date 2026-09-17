import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

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

export const Services = defineModel(z.array(z.enum(Service)).transform(sansDoublons).brand('Services'));

export type Services = Model.TypeOf<typeof Services>;
