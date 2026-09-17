import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

export enum Itinerance {
  Itinerant = 'Itinérant',
  Fixe = 'Fixe'
}

/**
 * Les doublons tombent à la construction, et c'est le schéma qui les écarte : la mise en
 * forme survit ainsi à la composition, là où un traitement posé dans le constructeur serait
 * contourné dès que `.schema` est imbriqué ailleurs.
 */
export const Itinerances = defineModel(z.array(z.enum(Itinerance)).transform(sansDoublons).brand('Itinerances'));

export type Itinerances = Model.TypeOf<typeof Itinerances>;
