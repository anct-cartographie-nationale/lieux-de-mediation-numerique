import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

export enum PriseEnChargeSpecifique {
  Surdite = 'Surdité',
  HandicapsMoteurs = 'Handicaps moteurs',
  HandicapsMentaux = 'Handicaps mentaux',
  Illettrisme = 'Illettrisme',
  LanguesEtrangeresAnglais = 'Langues étrangères (anglais)',
  LanguesEtrangeresAutre = 'Langues étrangères (autres)',
  DeficienceVisuelle = 'Déficience visuelle'
}

/**
 * Les doublons tombent à la construction, et c'est le schéma qui les écarte : la mise en
 * forme survit ainsi à la composition, là où un traitement posé dans le constructeur serait
 * contourné dès que `.schema` est imbriqué ailleurs.
 */
export const PrisesEnChargeSpecifiques = defineModel(
  z.array(z.enum(PriseEnChargeSpecifique)).transform(sansDoublons).brand('PrisesEnChargeSpecifiques')
);

export type PrisesEnChargeSpecifiques = Model.TypeOf<typeof PrisesEnChargeSpecifiques>;
