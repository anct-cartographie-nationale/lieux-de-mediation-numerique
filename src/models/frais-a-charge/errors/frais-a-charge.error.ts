import { ModelError } from '../../../errors';
import { Frais, FraisAChargeIndefini } from '../frais-a-charge';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class FraisAChargeError extends ModelError<LieuMediationNumerique> {
  constructor(frais: Frais | FraisAChargeIndefini) {
    super('frais_a_charge', `'${frais}' n'est pas une valeur de frais à charge admise`);
  }
}
