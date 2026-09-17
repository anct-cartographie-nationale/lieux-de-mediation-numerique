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
  it.each([
    ['Paris à La Réunion', { latitude: 48.8566, longitude: 2.3522 }, { latitude: -20.8823, longitude: 55.4504 }, 9365],
    ['Paris à la Martinique', { latitude: 48.8566, longitude: 2.3522 }, { latitude: 14.6161, longitude: -61.0588 }, 6854],
    ['Paris à Marseille', { latitude: 48.8566, longitude: 2.3522 }, { latitude: 43.2965, longitude: 5.3698 }, 660]
  ])(
    'mesure %s à l’orthodromie, et non à l’approximation plane qui s’en écartait de près de trois pour cent',
    (_: string, une, autre, kilometresAttendus: number): void => {
      expect(Math.round(distanceEnMetres(une, autre) / 1000)).toBe(kilometresAttendus);
    }
  );
});
