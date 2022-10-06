import { OptionalPropertyError } from '../../../errors';
import { LabelNational, LabelNationalIndefini } from '../label-national';

export class LabelsNationauxError extends OptionalPropertyError {
  constructor(labelNational: LabelNational | LabelNationalIndefini) {
    super('labels_nationaux', `La label national '${labelNational}' n'est pas une valeur admise`);
  }
}
