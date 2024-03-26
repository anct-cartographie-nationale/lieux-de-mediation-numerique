import { Model } from '../model';
import { FraisAChargeError } from './errors';

export enum Frais {
  Gratuit = 'Gratuit : Je peux accéder gratuitement au lieu et à ses services',
  GratuitSousCondition = 'Gratuit sous condition : La gratuité est conditionnée à des critères (situation familiale, convention avec un organisme social...)',
  Payant = "Payant : L'accès au lieu et/ou à ses services est payant"
}

export type FraisACharge = Model<'FraisACharge', Frais[]>;

export type FraisAChargeIndefini = 'frais à charge indéfinie';

const firstInvalidFraisACharge = (fraisACharge: Frais): boolean => !Object.values(Frais).includes(fraisACharge);

const throwFraisAChargeError = (fraisACharge: Frais[]): FraisACharge => {
  throw new FraisAChargeError(fraisACharge.find(firstInvalidFraisACharge) ?? 'frais à charge indéfinie');
};

const isFraisACharge = (fraisACharge: Frais[]): fraisACharge is FraisACharge =>
  fraisACharge.find(firstInvalidFraisACharge) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const FraisACharge = (frais: Frais[]): FraisACharge => (isFraisACharge(frais) ? frais : throwFraisAChargeError(frais));
