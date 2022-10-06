import { ConditionAccess, ConditionsAccess } from './condition-access';
import { ConditionsAccessError } from './errors';

describe('condition access model', (): void => {
  it('should create a valide conditions access', (): void => {
    const conditionAccess: ConditionsAccess = ConditionsAccess([ConditionAccess.Adhesion]);

    expect(conditionAccess).toStrictEqual(['Adhésion']);
  });

  it('should not create invalid conditions access', (): void => {
    expect((): void => {
      ConditionsAccess(['Remboursable par la sécurité sociale' as ConditionAccess]);
    }).toThrow(new ConditionsAccessError('Remboursable par la sécurité sociale' as ConditionAccess));
  });

  it('should not create invalid conditions access containing a valid and an invalid value', (): void => {
    expect((): void => {
      ConditionsAccess([ConditionAccess.Adhesion, 'Remboursable par la sécurité sociale' as ConditionAccess]);
    }).toThrow(new ConditionsAccessError('Remboursable par la sécurité sociale' as ConditionAccess));
  });
});
