import { describe, expect, it } from 'vitest';
import { DispositifProgrammeNational, DispositifProgrammesNationaux } from './dispositif-programme-national';

describe('dispositif programme national model', (): void => {
  it('should create valid dispositif programmes nationaux', (): void => {
    const dispositifProgrammesNationaux: DispositifProgrammesNationaux = DispositifProgrammesNationaux([
      DispositifProgrammeNational.ConseillersNumeriques
    ]);

    expect(dispositifProgrammesNationaux).toStrictEqual([DispositifProgrammeNational.ConseillersNumeriques]);
  });

  it('should not create invalid dispositif programmes nationaux', (): void => {
    expect(DispositifProgrammesNationaux.safe(['France Emploi' as DispositifProgrammeNational])).toBeNull();
  });

  it('should not create invalid dispositif programmes nationaux containing a valid and an invalid value', (): void => {
    expect(
      DispositifProgrammesNationaux.safe([
        DispositifProgrammeNational.ConseillersNumeriques,
        'France Emploi' as DispositifProgrammeNational
      ])
    ).toBeNull();
  });
});
