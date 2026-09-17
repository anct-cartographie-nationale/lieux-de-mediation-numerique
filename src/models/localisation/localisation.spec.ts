import { describe, it, expect } from 'vitest';
import { Localisation, type LocalisationToValidate } from './localisation';
import { LatitudeError, LongitudeError } from './errors';

describe('localisation model', (): void => {
  it('should create a valid localisation', (): void => {
    const localisationData: LocalisationToValidate = {
      latitude: 45.7665478,
      longitude: 4.8375548
    };

    const localisation: Localisation = Localisation(localisationData);

    expect(localisation).toStrictEqual({ ...localisationData } as Localisation);
  });

  it('should throw LatitudeError when latitude is less than -90', (): void => {
    const localisationData: LocalisationToValidate = {
      latitude: -91,
      longitude: 4.8375548
    };

    expect((): void => {
      Localisation(localisationData);
    }).toThrow(new LatitudeError(-91));
  });

  it('should throw LatitudeError when latitude is more than 90', (): void => {
    const localisationData: LocalisationToValidate = {
      latitude: 91,
      longitude: 4.8375548
    };

    expect((): void => {
      Localisation(localisationData);
    }).toThrow(new LatitudeError(91));
  });

  it('should throw longitudeError when longitude is less than -180', (): void => {
    const localisationData: LocalisationToValidate = {
      latitude: 4.8375548,
      longitude: -181
    };

    expect((): void => {
      Localisation(localisationData);
    }).toThrow(new LongitudeError(-181));
  });

  it('should throw longitudeError when longitude is more than 180', (): void => {
    const localisationData: LocalisationToValidate = {
      latitude: 4.8375548,
      longitude: 181
    };

    expect((): void => {
      Localisation(localisationData);
    }).toThrow(new LongitudeError(181));
  });

  /**
   * Le jeu d'essai d'origine portait Lyon coordonnées inversées — `4.83 / 45.76` — et le test
   * affirmait que c'était valide. Les bornes du globe ne pouvaient pas s'en apercevoir.
   */
  it('should refuse a pair that is valid once swapped', (): void => {
    expect((): void => {
      Localisation({ latitude: 4.8375548, longitude: 45.7665478 });
    }).toThrow(new LatitudeError(4.8375548));
  });

  it('should refuse a point outside every french territory', (): void => {
    expect((): void => {
      Localisation({ latitude: 52.52, longitude: 13.405 });
    }).toThrow(new LatitudeError(52.52));
  });

  it.each([
    ['La Réunion', -20.8823, 55.4504],
    ['Martinique', 14.6161, -61.0588],
    ['Guyane', 4.9224, -52.3135],
    ['Mayotte', -12.7806, 45.2278],
    ['Saint-Pierre-et-Miquelon', 46.7817, -56.1746],
    ['Nouvelle-Calédonie', -22.2758, 166.458]
  ])('should accept a point in %s', (_: string, latitude: number, longitude: number): void => {
    expect(Localisation({ latitude, longitude })).toStrictEqual({ latitude, longitude });
  });
});
