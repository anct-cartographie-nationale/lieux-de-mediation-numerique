import type { LocalisationToValidate } from '../../models';

const RAYON_TERRESTRE_EN_METRES: 6_371_000 = 6_371_000 as const;

const EN_RADIANS: number = Math.PI / 180;

export const distanceEnMetres = (une: LocalisationToValidate, autre: LocalisationToValidate): number =>
  ((deltaLatitude: number, deltaLongitude: number, uneLatitude: number, autreLatitude: number): number =>
    2 *
    RAYON_TERRESTRE_EN_METRES *
    Math.asin(
      Math.min(
        1,
        Math.sqrt(
          Math.sin(deltaLatitude / 2) ** 2 + Math.cos(uneLatitude) * Math.cos(autreLatitude) * Math.sin(deltaLongitude / 2) ** 2
        )
      )
    ))(
    (autre.latitude - une.latitude) * EN_RADIANS,
    (autre.longitude - une.longitude) * EN_RADIANS,
    une.latitude * EN_RADIANS,
    autre.latitude * EN_RADIANS
  );
