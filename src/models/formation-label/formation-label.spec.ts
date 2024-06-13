import { FormationLabel, FormationsLabels } from './formation-label';
import { FormationLabelError } from './errors';

describe('formations labels model', (): void => {
  it('should create valid formations labels', (): void => {
    const formationsLabels: FormationsLabels = FormationsLabels([FormationLabel.SudLabs]);

    expect(formationsLabels).toStrictEqual([FormationLabel.SudLabs]);
  });

  it('should not create invalid formation label', (): void => {
    expect((): void => {
      FormationsLabels(['France Emploi' as FormationLabel]);
    }).toThrow(new FormationLabelError('France Emploi' as FormationLabel));
  });

  it('should not create invalid formation label containing a valid and an invalid value', (): void => {
    expect((): void => {
      FormationsLabels([FormationLabel.SudLabs, 'Nièvre formation' as FormationLabel]);
    }).toThrow(new FormationLabelError('Nièvre formation' as FormationLabel));
  });
});
