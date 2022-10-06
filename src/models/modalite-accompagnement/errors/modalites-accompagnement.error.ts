import { OptionalPropertyError } from '../../../errors';
import { ModaliteAccompagnement, ModaliteAccompagnementIndefinie } from '../modalite-accompagnement';

export class ModalitesAccompagnementError extends OptionalPropertyError {
  constructor(modaliteAccompagnement: ModaliteAccompagnement | ModaliteAccompagnementIndefinie) {
    super('modalites_accompagnement', `La modalite d'accompagnement '${modaliteAccompagnement}' n'est pas une valeur admise`);
  }
}
