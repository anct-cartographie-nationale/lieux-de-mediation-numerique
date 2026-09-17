import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

export enum Frais {
  Gratuit = 'Gratuit',
  GratuitSousCondition = 'Gratuit sous condition',
  Payant = 'Payant'
}

/**
 * Les doublons tombent à la construction, et c'est le schéma qui les écarte : la mise en
 * forme survit ainsi à la composition, là où un traitement posé dans le constructeur serait
 * contourné dès que `.schema` est imbriqué ailleurs.
 */
export const FraisACharge = defineModel(z.array(z.enum(Frais)).transform(sansDoublons).brand('FraisACharge'));

export type FraisACharge = Model.TypeOf<typeof FraisACharge>;
