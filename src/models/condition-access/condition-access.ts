import { Model } from '../model';
import { ConditionsAccessError } from './errors';

export enum ConditionAccess {
  Adhesion = "Adhésion : L'accès au lieu et/ou à ses services nécessite d'y adhérer",
  Gratuit = 'Gratuit : Je peux accéder gratuitement au lieu et à ses services',
  GratuitSousCondition = 'Gratuit sous condition : La gratuité est conditionnée à des critères (situation familiale, convention avec un organisme social...)',
  AccepteLePassNumerique = "Accepte le Pass numérique : Il est possible d'utiliser un Pass numérique pour accéder au lieu",
  Payant = "Payant : L'accès au lieu et/ou à ses services est payant"
}

export type ConditionsAccess = Model<'ConditionsAccess', ConditionAccess[]>;

export type ConditionsAccessIndefinie = "condition d'accès indéfinie";

const firstInvalidConditionAccess = (conditionAccess: ConditionAccess): boolean =>
  !Object.values(ConditionAccess).includes(conditionAccess);

const throwConditionsAccessError = (conditionsAccess: ConditionAccess[]): ConditionsAccess => {
  throw new ConditionsAccessError(conditionsAccess.find(firstInvalidConditionAccess) ?? "condition d'accès indéfinie");
};

const isConditionsAccess = (conditionsAccess: ConditionAccess[]): conditionsAccess is ConditionsAccess =>
  conditionsAccess.find(firstInvalidConditionAccess) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const ConditionsAccess = (conditionsAccess: ConditionAccess[]): ConditionsAccess =>
  isConditionsAccess(conditionsAccess) ? conditionsAccess : throwConditionsAccessError(conditionsAccess);