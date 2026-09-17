import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

export enum ModaliteAccompagnement {
  EnAutonomie = 'En autonomie',
  AccompagnementIndividuel = 'Accompagnement individuel',
  DansUnAtelier = 'Dans un atelier collectif',
  ADistance = 'À distance'
}

export const ModalitesAccompagnement = defineModel(
  z.array(z.enum(ModaliteAccompagnement)).transform(sansDoublons).brand('ModalitesAccompagnement')
);

export type ModalitesAccompagnement = Model.TypeOf<typeof ModalitesAccompagnement>;
