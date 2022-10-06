import { OptionalPropertyError } from '../../../errors';
import { PublicAccueilli, PublicAccueilliIndefini } from '../public-accueilli';

export class PublicsAccueillisError extends OptionalPropertyError {
  constructor(publicAccueilli: PublicAccueilli | PublicAccueilliIndefini) {
    super('publics_accueillis', `Le public accueilli '${publicAccueilli}' n'est pas une valeur admise`);
  }
}
