import { describe, it, expect } from 'vitest';
import { Localisation, LocalisationToValidate } from './localisation';
import { LatitudeError, LongitudeError } from './errors';

describe('localisation model', (): void => {
  it('should create a valid localisation', (): void => {
    const localisationData: LocalisationToValidate = {
      latitude: 4.8375548,
      longitude: 45.7665478
    };

    const localisation: Localisation = Localisation(localisationData);

    expect(localisation).toStrictEqual({ ...localisationData } as Localisation);
  });

  it('should throw LatitudeError when latitude is less than -90', (): void => {
    const localisationData: LocalisationToValidate = {
      latitude: -91,
      longitude: 45.7665478
    };

    expect((): void => {
      Localisation(localisationData);
    }).toThrow(new LatitudeError(-91));
  });

  it('should throw LatitudeError when latitude is more than 90', (): void => {
    const localisationData: LocalisationToValidate = {
      latitude: 91,
      longitude: 45.7665478
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
});
