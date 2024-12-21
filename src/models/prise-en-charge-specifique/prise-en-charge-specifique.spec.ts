import { describe, it, expect } from 'vitest';
import { PriseEnChargeSpecifique, PrisesEnChargeSpecifiques } from './prise-en-charge-specifique';
import { PrisesEnChargeSpecifiquesError } from './errors';

describe('prise en charge spécifique adresses model', (): void => {
  it('should create valid prise en charge spécifique', (): void => {
    const prisesEnChargeSpecifiques: PrisesEnChargeSpecifiques = PrisesEnChargeSpecifiques([
      PriseEnChargeSpecifique.Illettrisme
    ]);

    expect(prisesEnChargeSpecifiques).toStrictEqual([PriseEnChargeSpecifique.Illettrisme]);
  });

  it('should not create invalid prise en charge spécifique', (): void => {
    expect((): void => {
      PrisesEnChargeSpecifiques(['Handicape psychique' as PriseEnChargeSpecifique]);
    }).toThrow(new PrisesEnChargeSpecifiquesError('Handicape psychique' as PriseEnChargeSpecifique));
  });

  it('should not create invalid prise en charge spécifique containing a valid and an invalid value', (): void => {
    expect((): void => {
      PrisesEnChargeSpecifiques([PriseEnChargeSpecifique.Illettrisme, 'Handicape psychique' as PriseEnChargeSpecifique]);
    }).toThrow(new PrisesEnChargeSpecifiquesError('Handicape psychique' as PriseEnChargeSpecifique));
  });
});
