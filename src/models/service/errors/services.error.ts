import { Service, ServiceIndefini } from '../service';
import { ModelError } from '../../../errors';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class ServicesError extends ModelError<LieuMediationNumerique> {
  constructor(service: Service | ServiceIndefini) {
    super('services', `Le service '${service}' n'est pas une valeur admise`);
  }
}
