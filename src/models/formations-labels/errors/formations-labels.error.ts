import { ModelError } from '../../../errors';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';
import { FormationLabel, FormationLabelIndefini } from '../formations-labels';

export class FormationsLabelsError extends ModelError<LieuMediationNumerique> {
  constructor(formationLabel: FormationLabel | FormationLabelIndefini) {
    super('formations_labels', `La formation ou le label '${formationLabel}' n'est pas une valeur admise`);
  }
}
