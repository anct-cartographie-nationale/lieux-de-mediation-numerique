import { ModelError } from '../../../errors';
import { LabelNational, LabelNationalIndefini } from '../label-national';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class LabelsNationauxError extends ModelError<LieuMediationNumerique> {
  constructor(labelNational: LabelNational | LabelNationalIndefini) {
    super('labels_nationaux', `La label national '${labelNational}' n'est pas une valeur admise`);
  }
}
