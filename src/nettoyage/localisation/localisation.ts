import { estInverse } from '../../models/localisation/emprises';

export type Coordonnees = { latitude: number; longitude: number };

export const corrigerInversion = ({ latitude, longitude }: Coordonnees): Coordonnees =>
  estInverse(latitude, longitude) ? { latitude: longitude, longitude: latitude } : { latitude, longitude };

const DECIMALES_UTILES = 6;

export const arrondirCoordonnees = ({ latitude, longitude }: Coordonnees): Coordonnees => ({
  latitude: Number(latitude.toFixed(DECIMALES_UTILES)),
  longitude: Number(longitude.toFixed(DECIMALES_UTILES))
});
