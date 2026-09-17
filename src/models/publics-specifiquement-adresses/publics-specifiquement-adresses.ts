import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

export enum PublicSpecifiquementAdresse {
  Jeunes = 'Jeunes',
  Etudiants = 'Étudiants',
  FamillesEnfants = 'Familles et/ou enfants',
  Seniors = 'Seniors',
  Femmes = 'Femmes'
}

/**
 * Les doublons tombent à la construction, et c'est le schéma qui les écarte : la mise en
 * forme survit ainsi à la composition, là où un traitement posé dans le constructeur serait
 * contourné dès que `.schema` est imbriqué ailleurs.
 */
export const PublicsSpecifiquementAdresses = defineModel(
  z.array(z.enum(PublicSpecifiquementAdresse)).transform(sansDoublons).brand('PublicsSpecifiquementAdresses')
);

export type PublicsSpecifiquementAdresses = Model.TypeOf<typeof PublicsSpecifiquementAdresses>;
