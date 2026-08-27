import { describe, it, expect } from 'vitest';
import { distanceEnMetres } from './distance';

describe('distanceEnMetres', (): void => {
  it('should be null between a point and itself', (): void => {
    expect(distanceEnMetres({ latitude: 48.869, longitude: 2.331 }, { latitude: 48.869, longitude: 2.331 })).toBe(0);
  });

  it('should measure a short distance in Paris', (): void => {
    const distance: number = distanceEnMetres({ latitude: 48.869, longitude: 2.331 }, { latitude: 48.8692, longitude: 2.331 });

    expect(distance).toBeGreaterThan(20);
    expect(distance).toBeLessThan(25);
  });

  it('should be symmetric', (): void => {
    const paris = { latitude: 48.8566, longitude: 2.3522 };
    const lyon = { latitude: 45.764, longitude: 4.8357 };

    expect(distanceEnMetres(paris, lyon)).toBeCloseTo(distanceEnMetres(lyon, paris), 6);
  });

  it('should match the known distance between Paris and Lyon', (): void => {
    const distance: number = distanceEnMetres(
      { latitude: 48.8566, longitude: 2.3522 },
      { latitude: 45.764, longitude: 4.8357 }
    );

    expect(distance / 1000).toBeGreaterThan(390);
    expect(distance / 1000).toBeLessThan(394);
  });

  it('should not let the threshold drift with latitude', (): void => {
    const enMetropole: number = distanceEnMetres({ latitude: 50.63, longitude: 3.06 }, { latitude: 50.63, longitude: 3.061 });
    const auxAntilles: number = distanceEnMetres({ latitude: 14.6, longitude: -61.08 }, { latitude: 14.6, longitude: -61.079 });

    expect(auxAntilles).toBeGreaterThan(enMetropole * 1.5);
  });
});
