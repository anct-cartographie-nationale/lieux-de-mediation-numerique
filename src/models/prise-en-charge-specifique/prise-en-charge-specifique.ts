import { Model } from '../model';
import { PrisesEnChargeSpecifiquesError } from './errors';

export enum PriseEnChargeSpecifique {
  Surdite = 'Surdité',
  HandicapsMoteurs = 'Handicaps moteurs',
  HandicapsMentaux = 'Handicaps mentaux',
  Illettrisme = 'Illettrisme',
  LanguesEtrangeresAnglais = 'Langues étrangères (anglais)',
  LanguesEtrangeresAutre = 'Langues étrangères (autres)',
  DeficienceVisuelle = 'Déficience visuelle'
}

export type PrisesEnChargeSpecifiques = Model<'PrisesEnChargeSpecifiques', PriseEnChargeSpecifique[]>;

export type PriseEnChargeSpecifiqueIndefini = 'public pris en charge spécifiquement indéfini';

const firstInvalidPriseEnChargeSpecifique = (priseEnChargeSpecifique: PriseEnChargeSpecifique): boolean =>
  !Object.values(PriseEnChargeSpecifique).includes(priseEnChargeSpecifique);

const throwPrisesEnChargeSpecifiquesError = (
  prisesEnChargeSpecifiques: PriseEnChargeSpecifique[]
): PrisesEnChargeSpecifiques => {
  throw new PrisesEnChargeSpecifiquesError(
    prisesEnChargeSpecifiques.find(firstInvalidPriseEnChargeSpecifique) ?? 'public pris en charge spécifiquement indéfini'
  );
};

const isPrisesEnChargeSpecifiques = (
  prisesEnChargeSpecifiques: PriseEnChargeSpecifique[]
): prisesEnChargeSpecifiques is PrisesEnChargeSpecifiques =>
  prisesEnChargeSpecifiques.find(firstInvalidPriseEnChargeSpecifique) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const PrisesEnChargeSpecifiques = (prisesEnChargeSpecifiques: PriseEnChargeSpecifique[]): PrisesEnChargeSpecifiques =>
  isPrisesEnChargeSpecifiques(prisesEnChargeSpecifiques)
    ? (prisesEnChargeSpecifiques as PrisesEnChargeSpecifiques)
    : throwPrisesEnChargeSpecifiquesError(prisesEnChargeSpecifiques);
