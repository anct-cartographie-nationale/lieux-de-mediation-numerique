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

export const FraisACharge = (frais: Frais[]): FraisACharge => (isFraisACharge(frais) ? frais : throwFraisAChargeError(frais));
