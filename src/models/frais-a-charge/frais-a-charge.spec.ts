import { describe, expect, it } from 'vitest';
import { Frais, FraisACharge } from './frais-a-charge';

describe('condition acces model', (): void => {
  it('should create valid conditions acces', (): void => {
    const conditionAcces: FraisACharge = FraisACharge([Frais.Gratuit]);

    expect(conditionAcces).toStrictEqual(['Gratuit']);
  });

  it('should not create invalid conditions acces', (): void => {
    expect(FraisACharge.safe(['Remboursable par la sécurité sociale' as Frais])).toBeNull();
  });

  it('should not create invalid conditions acces containing a valid and an invalid value', (): void => {
    expect(FraisACharge.safe([Frais.GratuitSousCondition, 'Remboursable par la sécurité sociale' as Frais])).toBeNull();
  });
});
