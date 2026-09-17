import { describe, it, expect } from 'vitest';
import { arrondirCoordonnees, corrigerInversion } from './localisation';

describe('corrigerInversion', (): void => {
  it('should swap a pair that only makes sense the other way round', (): void => {
    expect(corrigerInversion({ latitude: -61.0284, longitude: 14.8204 })).toStrictEqual({
      latitude: 14.8204,
      longitude: -61.0284
    });
  });

  it('should leave a pair that already falls in a french territory', (): void => {
    expect(corrigerInversion({ latitude: 45.7665478, longitude: 4.8375548 })).toStrictEqual({
      latitude: 45.7665478,
      longitude: 4.8375548
    });
  });

  it('should leave a pair that makes sense in neither direction', (): void => {
    expect(corrigerInversion({ latitude: 52.52, longitude: 13.405 })).toStrictEqual({ latitude: 52.52, longitude: 13.405 });
  });
});

describe('arrondirCoordonnees', (): void => {
  it('should keep six decimals, which are about ten centimetres', (): void => {
    expect(arrondirCoordonnees({ latitude: 45.766547812345, longitude: 4.837554887654 })).toStrictEqual({
      latitude: 45.766548,
      longitude: 4.837555
    });
  });

  it('should leave a coarser coordinate alone', (): void => {
    expect(arrondirCoordonnees({ latitude: 45.76, longitude: 4.83 })).toStrictEqual({ latitude: 45.76, longitude: 4.83 });
  });
});
