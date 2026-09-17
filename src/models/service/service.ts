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

/**
 * Le socle admet la liste vide : c'est l'assemblage « pour la cartographie » qui exige au
 * moins un service, faute de quoi la coop ne pourrait pas composer ce schéma sans renier sa
 * base, qui autorise la liste vide et ne filtre qu'à la publication (D29.3).
 *
 * Les doublons tombent à la construction, et c'est le schéma qui les écarte : la mise en
 * forme survit ainsi à la composition, là où un traitement posé dans le constructeur serait
 * contourné dès que `.schema` est imbriqué ailleurs.
 */
export const Services = defineModel(z.array(z.enum(Service)).transform(sansDoublons).brand('Services'));

export type Services = Model.TypeOf<typeof Services>;
