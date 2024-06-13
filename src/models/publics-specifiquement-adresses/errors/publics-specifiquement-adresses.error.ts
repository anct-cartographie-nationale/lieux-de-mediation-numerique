import { ModelError } from '../../../errors';
import { PublicSpecifiquementAdresse, PublicSpecifiquementAdresseIndefini } from '../publics-specifiquement-adresses';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class PublicsSpecifiquementAdressesError extends ModelError<LieuMediationNumerique> {
  constructor(publicSpecifiquementAdresse: PublicSpecifiquementAdresse | PublicSpecifiquementAdresseIndefini) {
    super(
      'publics_specifiquement_adresses',
      `Le public spécifiquement adressé '${publicSpecifiquementAdresse}' n'est pas une valeur admise`
    );
  }
}
