import { ModelError } from '../../../errors';
import { ModaliteAccompagnement, ModaliteAccompagnementIndefinie } from '../modalite-accompagnement';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class ModalitesAccompagnementError extends ModelError<LieuMediationNumerique> {
  constructor(modaliteAccompagnement: ModaliteAccompagnement | ModaliteAccompagnementIndefinie) {
    super('modalites_accompagnement', `La modalite d'accompagnement '${modaliteAccompagnement}' n'est pas une valeur admise`);
  }
}
