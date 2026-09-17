import { ModelError } from '../../../errors';
import type { ModaliteAccompagnement, ModaliteAccompagnementIndefinie } from '../modalite-accompagnement';
import type { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class ModalitesAccompagnementError extends ModelError<LieuMediationNumerique> {
  constructor(modaliteAccompagnement: ModaliteAccompagnement | ModaliteAccompagnementIndefinie) {
    super('modalites_accompagnement', `La modalite d'accompagnement '${modaliteAccompagnement}' n'est pas une valeur admise`);
  }
}
