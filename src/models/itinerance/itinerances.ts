import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons, triee } from '../liste';

export enum Itinerance {
  Itinerant = 'Itinérant',
  Fixe = 'Fixe'
}

export const Itinerances = defineModel(
  z.array(z.enum(Itinerance)).transform(sansDoublons).transform(triee).brand('Itinerances')
);

export type Itinerances = Model.TypeOf<typeof Itinerances>;
