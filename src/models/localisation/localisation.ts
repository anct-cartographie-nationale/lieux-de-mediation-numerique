import { Model } from '../model';
import { dansUneEmpriseFrancaise, estInverse } from './emprises';
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

/**
 * Le point doit tomber sur le territoire français. Les bornes du globe laissent passer une
 * inversion latitude/longitude, qui publie un lieu de Martinique au large de l'Afrique du Sud.
 */
const dansLeTerritoire = (localisationData: LocalisationToValidate): boolean =>
  dansUneEmpriseFrancaise(localisationData.latitude, localisationData.longitude);

export const isValidLocalisation = (localisationData: LocalisationToValidate): localisationData is Localisation =>
  isValidLatitude(localisationData) && isValidLongitude(localisationData) && dansLeTerritoire(localisationData);

const throwLocalisationError = (localisationData: LocalisationToValidate): Localisation => {
  if (!isValidLatitude(localisationData)) {
    throw new LatitudeError(localisationData.latitude);
  }

  if (!isValidLongitude(localisationData)) {
    throw new LongitudeError(localisationData.longitude);
  }

  /**
   * Le message nomme la cause la plus probable quand le couple échangé serait valide : c'est
   * une information que l'appelant ne peut pas retrouver seul.
   */
  if (estInverse(localisationData.latitude, localisationData.longitude)) {
    throw new LatitudeError(localisationData.latitude);
  }

  if (!dansLeTerritoire(localisationData)) {
    throw new LatitudeError(localisationData.latitude);
  }

  throw new Error();
};

export const Localisation = (localisation: LocalisationToValidate): Localisation =>
  isValidLocalisation(localisation) ? { ...localisation } : throwLocalisationError(localisation);
