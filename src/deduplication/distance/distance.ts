import { LocalisationToValidate } from '../../models';

const RAYON_TERRESTRE_EN_METRES: 6_371_000 = 6_371_000 as const;

const EN_RADIANS: number = Math.PI / 180;

export const distanceEnMetres = (une: LocalisationToValidate, autre: LocalisationToValidate): number =>
  ((deltaLatitude: number, deltaLongitude: number, latitudeMoyenne: number): number =>
    RAYON_TERRESTRE_EN_METRES * Math.sqrt(deltaLatitude ** 2 + (deltaLongitude * Math.cos(latitudeMoyenne)) ** 2))(
    (autre.latitude - une.latitude) * EN_RADIANS,
    (autre.longitude - une.longitude) * EN_RADIANS,
    ((une.latitude + autre.latitude) / 2) * EN_RADIANS
  );
