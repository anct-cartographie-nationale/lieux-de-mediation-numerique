import { ModelError } from '../../../errors';
import type { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class HorairesError extends ModelError<LieuMediationNumerique> {
  public constructor(horaires: string) {
    super('horaires', `Les horaires '${horaires}' ne suivent pas le format OpenStreetMap`);
  }
}
