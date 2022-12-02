import { Model } from '../model';
import { ConditionsAccesError } from './errors';

export enum ConditionAcces {
  Adhesion = "Adhésion : L'accès au lieu et/ou à ses services nécessite d'y adhérer",
  Gratuit = 'Gratuit : Je peux accéder gratuitement au lieu et à ses services',
  GratuitSousCondition = 'Gratuit sous condition : La gratuité est conditionnée à des critères (situation familiale, convention avec un organisme social...)',
  AccepteLePassNumerique = "Accepte le Pass numérique : Il est possible d'utiliser un Pass numérique pour accéder au lieu",
  Payant = "Payant : L'accès au lieu et/ou à ses services est payant"
}

export type ConditionsAcces = Model<'ConditionsAcces', ConditionAcces[]>;

export type ConditionsAccesIndefinie = "condition d'accès indéfinie";

const firstInvalidConditionAcces = (conditionAcces: ConditionAcces): boolean =>
  !Object.values(ConditionAcces).includes(conditionAcces);

const throwConditionsAccesError = (conditionsAcces: ConditionAcces[]): ConditionsAcces => {
  throw new ConditionsAccesError(conditionsAcces.find(firstInvalidConditionAcces) ?? "condition d'accès indéfinie");
};

const isConditionsAcces = (conditionsAcces: ConditionAcces[]): conditionsAcces is ConditionsAcces =>
  conditionsAcces.find(firstInvalidConditionAcces) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const ConditionsAcces = (conditionsAcces: ConditionAcces[]): ConditionsAcces =>
  isConditionsAcces(conditionsAcces) ? conditionsAcces : throwConditionsAccesError(conditionsAcces);
