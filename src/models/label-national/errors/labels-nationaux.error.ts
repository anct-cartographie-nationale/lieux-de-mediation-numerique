import { LabelNational, LabelNationalIndefini } from '../label-national';

export class LabelsNationauxError extends Error {
  constructor(labelNational: LabelNational | LabelNationalIndefini) {
    super(`La label national '${labelNational}' n'est pas une valeur admise`);
  }
}
