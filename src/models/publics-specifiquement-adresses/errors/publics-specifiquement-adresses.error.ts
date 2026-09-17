import { ModelError } from '../../../errors';
import type { PublicSpecifiquementAdresse, PublicSpecifiquementAdresseIndefini } from '../publics-specifiquement-adresses';
import type { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class PublicsSpecifiquementAdressesError extends ModelError<LieuMediationNumerique> {
  constructor(publicSpecifiquementAdresse: PublicSpecifiquementAdresse | PublicSpecifiquementAdresseIndefini) {
    super(
      'publics_specifiquement_adresses',
      `Le public spécifiquement adressé '${publicSpecifiquementAdresse}' n'est pas une valeur admise`
    );
  }
}
