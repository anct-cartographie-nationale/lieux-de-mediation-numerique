import { Model } from '../model';
import { FraisAChargeError } from './errors';

export enum Frais {
  Gratuit = 'Gratuit',
  GratuitSousCondition = 'Gratuit sous condition',
  Payant = 'Payant'
}

export type FraisACharge = Model<'FraisACharge', Frais[]>;

export type FraisAChargeIndefini = 'frais à charge indéfini';

const firstInvalidFraisACharge = (fraisACharge: Frais): boolean => !Object.values(Frais).includes(fraisACharge);

const throwFraisAChargeError = (fraisACharge: Frais[]): FraisACharge => {
  throw new FraisAChargeError(fraisACharge.find(firstInvalidFraisACharge) ?? 'frais à charge indéfini');
};

const isFraisACharge = (fraisACharge: Frais[]): fraisACharge is FraisACharge =>
  fraisACharge.find(firstInvalidFraisACharge) == null;

/**
 * Les doublons tombent à la construction. La bibliothèque ne dédupliquait que `Services` et
 * `ModalitesAccompagnement` — un écart qui ne tenait qu'à l'ordre dans lequel les modèles ont
 * été écrits, et qui finissait par surprendre.
 */
export const FraisACharge = (frais: Frais[]): FraisACharge => {
  const sansDoublons: Frais[] = Array.from(new Set(frais));

  return isFraisACharge(sansDoublons) ? sansDoublons : throwFraisAChargeError(frais);
};
