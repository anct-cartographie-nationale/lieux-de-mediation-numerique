import { DispositifProgrammeNational, DispositifsProgrammesNationaux } from './dispositifs-programmes-nationaux';
import { DispositifsProgrammesNationauxError } from './errors';

describe('dispositif et programme national model', (): void => {
  it('should create valid dispositifs et programmes nationaux', (): void => {
    const dispositifsProgrammesNationaux: DispositifsProgrammesNationaux = DispositifsProgrammesNationaux([
      DispositifProgrammeNational.FranceServices
    ]);

    expect(dispositifsProgrammesNationaux).toStrictEqual([DispositifProgrammeNational.FranceServices]);
  });

  it('should not create invalid dispositifs et programmes nationaux', (): void => {
    expect((): void => {
      DispositifsProgrammesNationaux(['France Emploi' as DispositifProgrammeNational]);
    }).toThrow(new DispositifsProgrammesNationauxError('France Emploi' as DispositifProgrammeNational));
  });

  it('should not create invalid dispositifs et programmes nationaux containing a valid and an invalid value', (): void => {
    expect((): void => {
      DispositifsProgrammesNationaux([
        DispositifProgrammeNational.FranceServices,
        'France Emploi' as DispositifProgrammeNational
      ]);
    }).toThrow(new DispositifsProgrammesNationauxError('France Emploi' as DispositifProgrammeNational));
  });
});
