import { ModelError } from '../../../errors';
import { DispositifProgrammeNational, DispositifProgrammeNationalIndefini } from '../dispositifs-programmes-nationaux';
import { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class DispositifsProgrammesNationauxError extends ModelError<LieuMediationNumerique> {
  constructor(dispositifProgrammeNational: DispositifProgrammeNational | DispositifProgrammeNationalIndefini) {
    super(
      'dispositifs_programmes_nationaux',
      `Le dispositif ou le programme national '${dispositifProgrammeNational}' n'est pas une valeur admise`
    );
  }
}
