import { ModelError } from '../../../errors';
import { PriseEnChargeSpecifique, PriseEnChargeSpecifiqueIndefini } from '../prise-en-charge-specifique';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class PrisesEnChargeSpecifiquesError extends ModelError<LieuMediationNumerique> {
  constructor(priseEnChargeSpecifique: PriseEnChargeSpecifique | PriseEnChargeSpecifiqueIndefini) {
    super(
      'prise_en_charge_specifique',
      `La prise en charge spécifique '${priseEnChargeSpecifique}' n'est pas une valeur admise`
    );
  }
}
