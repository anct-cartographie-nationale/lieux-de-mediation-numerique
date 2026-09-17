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
