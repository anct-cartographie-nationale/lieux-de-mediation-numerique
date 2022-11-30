import { ConditionAccess, ConditionsAccess } from './condition-access';
import { ConditionsAccessError } from './errors';

describe('condition access model', (): void => {
  it('should create valid conditions access', (): void => {
    const conditionAccess: ConditionsAccess = ConditionsAccess([ConditionAccess.Adhesion]);

    expect(conditionAccess).toStrictEqual(["Adhésion : L'accès au lieu et/ou à ses services nécessite d'y adhérer"]);
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