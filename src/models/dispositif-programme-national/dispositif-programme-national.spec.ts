import { describe, it, expect } from 'vitest';
import { DispositifProgrammeNational, DispositifProgrammesNationaux } from './dispositif-programme-national';
import { DispositifProgrammeNationalError } from './errors';

describe('dispositif programme national model', (): void => {
  it('should create valid dispositif programmes nationaux', (): void => {
    const dispositifProgrammesNationaux: DispositifProgrammesNationaux = DispositifProgrammesNationaux([
      DispositifProgrammeNational.ConseillersNumeriques
    ]);

    expect(dispositifProgrammesNationaux).toStrictEqual([DispositifProgrammeNational.ConseillersNumeriques]);
  });

  it('should not create invalid dispositif programmes nationaux', (): void => {
    expect((): void => {
      DispositifProgrammesNationaux(['France Emploi' as DispositifProgrammeNational]);
    }).toThrow(new DispositifProgrammeNationalError('France Emploi' as DispositifProgrammeNational));
  });

  it('should not create invalid dispositif programmes nationaux containing a valid and an invalid value', (): void => {
    expect((): void => {
      DispositifProgrammesNationaux([
        DispositifProgrammeNational.ConseillersNumeriques,
        'France Emploi' as DispositifProgrammeNational
      ]);
    }).toThrow(new DispositifProgrammeNationalError('France Emploi' as DispositifProgrammeNational));
  });
});
