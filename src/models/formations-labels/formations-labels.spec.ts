import { FormationsLabelsError } from './errors';
import { FormationLabel, FormationsLabels } from './formations-labels';

describe('formations et labels model', (): void => {
  it('should create valid formations et labels', (): void => {
    const formationsLabels: FormationsLabels = FormationsLabels([FormationLabel.SudLabs]);

    expect(formationsLabels).toStrictEqual([FormationLabel.SudLabs]);
  });

  it('should not create invalid formations et labels', (): void => {
    expect((): void => {
      FormationsLabels(['France Services' as FormationLabel]);
    }).toThrow(new FormationsLabelsError('France Services' as FormationLabel));
  });

  it('should not create invalid formations et labels containing a valid and an invalid value', (): void => {
    expect((): void => {
      FormationsLabels([FormationLabel.SudLabs, 'France Services' as FormationLabel]);
    }).toThrow(new FormationsLabelsError('France Services' as FormationLabel));
  });
});
