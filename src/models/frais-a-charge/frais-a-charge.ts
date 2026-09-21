import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons, triee } from '../liste';

export enum Frais {
  Gratuit = 'Gratuit',
  GratuitSousCondition = 'Gratuit sous condition',
  Payant = 'Payant'
}

export const FraisACharge = defineModel(z.array(z.enum(Frais)).transform(sansDoublons).transform(triee).brand('FraisACharge'));

export type FraisACharge = Model.TypeOf<typeof FraisACharge>;
