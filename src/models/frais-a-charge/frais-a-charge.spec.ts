import { describe, it, expect } from 'vitest';
import { Frais, FraisACharge } from './frais-a-charge';
import { FraisAChargeError } from './errors';

describe('condition acces model', (): void => {
  it('should create valid conditions acces', (): void => {
    const conditionAcces: FraisACharge = FraisACharge([Frais.Gratuit]);

    expect(conditionAcces).toStrictEqual(['Gratuit']);
  });

  it('should not create invalid conditions acces', (): void => {
    expect((): void => {
      FraisACharge(['Remboursable par la sécurité sociale' as Frais]);
    }).toThrow(new FraisAChargeError('Remboursable par la sécurité sociale' as Frais));
  });

  it('should not create invalid conditions acces containing a valid and an invalid value', (): void => {
    expect((): void => {
      FraisACharge([Frais.GratuitSousCondition, 'Remboursable par la sécurité sociale' as Frais]);
    }).toThrow(new FraisAChargeError('Remboursable par la sécurité sociale' as Frais));
  });
});
