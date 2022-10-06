import { PublicAccueilli, PublicAccueilliIndefini } from '../public-accueilli';

export class PublicsAccueillisError extends Error {
  constructor(publicAccueilli: PublicAccueilli | PublicAccueilliIndefini) {
    super(`Le public accueilli '${publicAccueilli}' n'est pas une valeur admise`);
  }
}
