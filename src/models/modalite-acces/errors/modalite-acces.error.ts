import { ModelError } from '../../../errors';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';
import { ModaliteAcces, ModalitesAccesIndefinie } from '../modalite-acces';

export class ModalitesAccesError extends ModelError<LieuMediationNumerique> {
  constructor(modalitesAcces: ModaliteAcces | ModalitesAccesIndefinie) {
    super('modalites_acces', `La modalité d'accès '${modalitesAcces}' n'est pas une valeur admise`);
  }
}
