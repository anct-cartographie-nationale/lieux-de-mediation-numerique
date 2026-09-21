import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons, triee } from '../liste';

export enum PublicSpecifiquementAdresse {
  Jeunes = 'Jeunes',
  Etudiants = 'Étudiants',
  FamillesEnfants = 'Familles et/ou enfants',
  Seniors = 'Seniors',
  Femmes = 'Femmes'
}

export const PublicsSpecifiquementAdresses = defineModel(
  z.array(z.enum(PublicSpecifiquementAdresse)).transform(sansDoublons).transform(triee).brand('PublicsSpecifiquementAdresses')
);

export type PublicsSpecifiquementAdresses = Model.TypeOf<typeof PublicsSpecifiquementAdresses>;
