import { ModelError } from '../../../errors';
import { Itinerance, ItineranceIndefinie } from '../itinerances';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class ItineranceError extends ModelError<LieuMediationNumerique> {
  constructor(itinerance: Itinerance | ItineranceIndefinie) {
    super('itinerance', `'${itinerance}' n'est pas une valeur d'itinérance admise`);
  }
}
