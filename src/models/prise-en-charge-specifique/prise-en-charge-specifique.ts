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

/**
 * Les doublons tombent à la construction. La bibliothèque ne dédupliquait que `Services` et
 * `ModalitesAccompagnement` — un écart qui ne tenait qu'à l'ordre dans lequel les modèles ont
 * été écrits, et qui finissait par surprendre.
 */
export const PrisesEnChargeSpecifiques = (prisesEnChargeSpecifiques: PriseEnChargeSpecifique[]): PrisesEnChargeSpecifiques => {
  const sansDoublons: PriseEnChargeSpecifique[] = Array.from(new Set(prisesEnChargeSpecifiques));

  return isPrisesEnChargeSpecifiques(sansDoublons)
    ? (sansDoublons as PrisesEnChargeSpecifiques)
    : throwPrisesEnChargeSpecifiquesError(prisesEnChargeSpecifiques);
};
