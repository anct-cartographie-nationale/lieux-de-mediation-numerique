import { ModelError } from '../../../errors';
import type { DispositifProgrammeNational, DispositifProgrammeNationalIndefini } from '../dispositif-programme-national';
import type { LieuMediationNumerique } from '../../lieu-mediation-numerique';

export class DispositifProgrammeNationalError extends ModelError<LieuMediationNumerique> {
  constructor(dispositifProgrammeNational: DispositifProgrammeNational | DispositifProgrammeNationalIndefini) {
    super(
      'dispositif_programmes_nationaux',
      `Le dispositif programmes national '${dispositifProgrammeNational}' n'est pas une valeur admise`
    );
  }
}
