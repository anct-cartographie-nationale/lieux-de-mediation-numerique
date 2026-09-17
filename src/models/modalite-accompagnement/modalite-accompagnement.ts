import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

export enum ModaliteAccompagnement {
  EnAutonomie = 'En autonomie',
  AccompagnementIndividuel = 'Accompagnement individuel',
  DansUnAtelier = 'Dans un atelier collectif',
  ADistance = 'À distance'
}

/**
 * Les doublons tombent à la construction, et c'est le schéma qui les écarte : la mise en
 * forme survit ainsi à la composition, là où un traitement posé dans le constructeur serait
 * contourné dès que `.schema` est imbriqué ailleurs.
 */
export const ModalitesAccompagnement = defineModel(
  z.array(z.enum(ModaliteAccompagnement)).transform(sansDoublons).brand('ModalitesAccompagnement')
);

export type ModalitesAccompagnement = Model.TypeOf<typeof ModalitesAccompagnement>;
