import { describe, it, expect } from 'vitest';
import { Typologie, Typologies } from './typologie';
import { TypologiesError } from './errors';

describe('typologie model', (): void => {
  it('should create valid typologies', (): void => {
    const typologies: Typologies = Typologies([Typologie.ACI]);

    expect(typologies).toStrictEqual([Typologie.ACI]);
  });

  it('should not create invalid typologies', (): void => {
    expect((): void => {
      Typologies(['MAIRIE' as Typologie]);
    }).toThrow(new TypologiesError('MAIRIE' as Typologie));
  });

  it('should not create invalid typologies containing a valid and an invalid value', (): void => {
    expect((): void => {
      Typologies([Typologie.ACI, 'MAIRIE' as Typologie]);
    }).toThrow(new TypologiesError('MAIRIE' as Typologie));
  });
});
