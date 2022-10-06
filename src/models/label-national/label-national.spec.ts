import { LabelNational, LabelsNationaux } from './label-national';
import { LabelsNationauxError } from './errors';

describe('label national model', (): void => {
  it('should create valid labels nationaux', (): void => {
    const labelNationaux: LabelsNationaux = LabelsNationaux([LabelNational.CNFS]);

    expect(labelNationaux).toStrictEqual([LabelNational.CNFS]);
  });

  it('should not create invalid labels nationaux', (): void => {
    expect((): void => {
      LabelsNationaux(['France Emploi' as LabelNational]);
    }).toThrow(new LabelsNationauxError('France Emploi' as LabelNational));
  });

  it('should not create invalid labels nationaux containing a valid and an invalid value', (): void => {
    expect((): void => {
      LabelsNationaux([LabelNational.CNFS, 'France Emploi' as LabelNational]);
    }).toThrow(new LabelsNationauxError('France Emploi' as LabelNational));
  });
});
