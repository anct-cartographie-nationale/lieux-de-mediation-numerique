import { ModaliteAccompagnement, ModaliteAccompagnementIndefinie } from '../modalite-accompagnement';

export class ModalitesAccompagnementError extends Error {
  constructor(modaliteAccompagnement: ModaliteAccompagnement | ModaliteAccompagnementIndefinie) {
    super(`La modalite d'accompagnement '${modaliteAccompagnement}' n'est pas une valeur admise`);
  }
}
