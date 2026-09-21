import { describe, expect, it } from 'vitest';
import { Typologie, Typologies } from './typologie';

describe('typologie model', (): void => {
  it('should create valid typologies', (): void => {
    const typologies: Typologies = Typologies([Typologie.ACI]);

    expect(typologies).toStrictEqual([Typologie.ACI]);
  });

  it('should not create invalid typologies', (): void => {
    expect(Typologies.safe(['MAIRIE' as Typologie])).toBeNull();
  });

  it('should not create invalid typologies containing a valid and an invalid value', (): void => {
    expect(Typologies.safe([Typologie.ACI, 'MAIRIE' as Typologie])).toBeNull();
  });
});

describe('ordre des typologies', (): void => {
  it('publie les typologies dans le même ordre quelle que soit la saisie', (): void => {
    expect(Typologies([Typologie.TIERS_LIEUX, Typologie.ASSO])).toStrictEqual(
      Typologies([Typologie.ASSO, Typologie.TIERS_LIEUX])
    );
  });

  it('ordonne et dédoublonne en une seule fois', (): void => {
    expect(Typologies([Typologie.BIB, Typologie.ASSO, Typologie.BIB])).toStrictEqual([Typologie.ASSO, Typologie.BIB]);
  });
});
