import { describe, expect, it } from 'vitest';
import { PriseEnChargeSpecifique, PrisesEnChargeSpecifiques } from './prise-en-charge-specifique';

describe('prise en charge spécifique adresses model', (): void => {
  it('should create valid prise en charge spécifique', (): void => {
    const prisesEnChargeSpecifiques: PrisesEnChargeSpecifiques = PrisesEnChargeSpecifiques([
      PriseEnChargeSpecifique.Illettrisme
    ]);

    expect(prisesEnChargeSpecifiques).toStrictEqual([PriseEnChargeSpecifique.Illettrisme]);
  });

  it('should not create invalid prise en charge spécifique', (): void => {
    expect(PrisesEnChargeSpecifiques.safe(['Handicape psychique' as PriseEnChargeSpecifique])).toBeNull();
  });

  it('should not create invalid prise en charge spécifique containing a valid and an invalid value', (): void => {
    expect(
      PrisesEnChargeSpecifiques.safe([PriseEnChargeSpecifique.Illettrisme, 'Handicape psychique' as PriseEnChargeSpecifique])
    ).toBeNull();
  });
});
