import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

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

export const DispositifProgrammesNationaux = defineModel(
  z.array(z.enum(DispositifProgrammeNational)).transform(sansDoublons).brand('DispositifProgrammesNationaux')
);

export type DispositifProgrammesNationaux = Model.TypeOf<typeof DispositifProgrammesNationaux>;
