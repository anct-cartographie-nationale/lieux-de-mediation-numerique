import { ModelError } from '../../../errors';
import { PublicAccueilli, PublicAccueilliIndefini } from '../public-accueilli';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class PublicsAccueillisError extends ModelError<LieuMediationNumerique> {
  constructor(publicAccueilli: PublicAccueilli | PublicAccueilliIndefini) {
    super('publics_accueillis', `Le public accueilli '${publicAccueilli}' n'est pas une valeur admise`);
  }
}
