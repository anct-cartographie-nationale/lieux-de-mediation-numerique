import { Model } from '../model';
import { LatitudeError, LongitudeError } from './errors';

export type LocalisationToValidate = {
  latitude: number;
  longitude: number;
};

export type Localisation = Model<
  'Localisation',
  {
    latitude: number;
    longitude: number;
  }
>;

const isValidLatitude = (localisationData: LocalisationToValidate): boolean =>
  localisationData.latitude >= -90 && localisationData.latitude <= 90;

const isValidLongitude = (localisationData: LocalisationToValidate): boolean =>
  localisationData.longitude >= -180 && localisationData.longitude <= 180;

export const isValidLocalisation = (localisationData: LocalisationToValidate): localisationData is Localisation =>
  isValidLatitude(localisationData) && isValidLongitude(localisationData);

const throwLocalisationError = (localisationData: LocalisationToValidate): Localisation => {
  if (!isValidLatitude(localisationData)) {
    throw new LatitudeError(localisationData.latitude);
  }

  if (!isValidLongitude(localisationData)) {
    throw new LongitudeError(localisationData.longitude);
  }

  throw new Error();
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Localisation = (localisation: LocalisationToValidate): Localisation =>
  isValidLocalisation(localisation) ? { ...localisation } : throwLocalisationError(localisation);
