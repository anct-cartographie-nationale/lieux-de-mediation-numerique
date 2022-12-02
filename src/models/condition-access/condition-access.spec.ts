import { ConditionAcces, ConditionsAcces } from './condition-acces';
import { ConditionsAccesError } from './errors';

describe('condition access model', (): void => {
  it('should create valid conditions access', (): void => {
    const conditionAccess: ConditionsAcces = ConditionsAcces([ConditionAcces.Adhesion]);

    expect(conditionAccess).toStrictEqual(["Adhésion : L'accès au lieu et/ou à ses services nécessite d'y adhérer"]);
  });

  it('should not create invalid conditions access', (): void => {
    expect((): void => {
      ConditionsAcces(['Remboursable par la sécurité sociale' as ConditionAcces]);
    }).toThrow(new ConditionsAccesError('Remboursable par la sécurité sociale' as ConditionAcces));
  });

  it('should not create invalid conditions access containing a valid and an invalid value', (): void => {
    expect((): void => {
      ConditionsAcces([ConditionAcces.Adhesion, 'Remboursable par la sécurité sociale' as ConditionAcces]);
    }).toThrow(new ConditionsAccesError('Remboursable par la sécurité sociale' as ConditionAcces));
  });
});
