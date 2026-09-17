import { ModelError } from '../../../errors';
import type { Frais, FraisAChargeIndefini } from '../frais-a-charge';
import type { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class FraisAChargeError extends ModelError<LieuMediationNumerique> {
  constructor(frais: Frais | FraisAChargeIndefini) {
    super('frais_a_charge', `'${frais}' n'est pas une valeur de frais à charge admise`);
  }
}
