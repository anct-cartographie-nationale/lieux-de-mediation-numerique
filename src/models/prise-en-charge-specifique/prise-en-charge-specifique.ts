import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons, triee } from '../liste';

export enum PriseEnChargeSpecifique {
  Surdite = 'Surdité',
  HandicapsMoteurs = 'Handicaps moteurs',
  HandicapsMentaux = 'Handicaps mentaux',
  Illettrisme = 'Illettrisme',
  LanguesEtrangeresAnglais = 'Langues étrangères (anglais)',
  LanguesEtrangeresAutre = 'Langues étrangères (autres)',
  DeficienceVisuelle = 'Déficience visuelle'
}

export const PrisesEnChargeSpecifiques = defineModel(
  z.array(z.enum(PriseEnChargeSpecifique)).transform(sansDoublons).transform(triee).brand('PrisesEnChargeSpecifiques')
);

export type PrisesEnChargeSpecifiques = Model.TypeOf<typeof PrisesEnChargeSpecifiques>;
