import { describe, expect, it } from 'vitest';
import { FormationLabel, FormationsLabels } from './formation-label';

describe('formations labels model', (): void => {
  it('should create valid formations labels', (): void => {
    const formationsLabels: FormationsLabels = FormationsLabels([FormationLabel.SudLabs]);

    expect(formationsLabels).toStrictEqual([FormationLabel.SudLabs]);
  });

  it('should not create invalid formation label', (): void => {
    expect(FormationsLabels.safe(['France Emploi' as FormationLabel])).toBeNull();
  });

  it('should not create invalid formation label containing a valid and an invalid value', (): void => {
    expect(FormationsLabels.safe([FormationLabel.SudLabs, 'Nièvre formation' as FormationLabel])).toBeNull();
  });
});
