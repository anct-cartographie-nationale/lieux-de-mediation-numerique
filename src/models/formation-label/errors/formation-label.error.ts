import { ModelError } from '../../../errors';
import type { FormationLabel, FormationLabelIndefini } from '../formation-label';
import type { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class FormationLabelError extends ModelError<LieuMediationNumerique> {
  constructor(formationLabel: FormationLabel | FormationLabelIndefini) {
    super('formations_labels', `Le label de formation '${formationLabel}' n'est pas une valeur admise`);
  }
}
