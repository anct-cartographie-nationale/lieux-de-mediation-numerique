import { estInverse } from '../../models/localisation/emprises';

export type Coordonnees = { latitude: number; longitude: number };

/**
 * Échange latitude et longitude lorsque l'inversion est avérée — c'est-à-dire lorsque le couple
 * échangé tombe dans une emprise française et que le couple d'origine n'y tombe pas.
 *
 * **Réparer et vérifier restent séparés** : la validation refuse un point hors emprise sans
 * jamais deviner l'intention du producteur. C'est à l'appelant d'appeler cette fonction avant
 * de valider, s'il le veut.
 */
export const corrigerInversion = ({ latitude, longitude }: Coordonnees): Coordonnees =>
  estInverse(latitude, longitude) ? { latitude: longitude, longitude: latitude } : { latitude, longitude };

const DECIMALES_UTILES = 6;

/**
 * Six décimales valent une dizaine de centimètres. Au-delà, la précision est un artefact de
 * calcul : le jeu national compte 449 lieux à quatorze décimales, soit le micron.
 *
 * **Non appliquée d'office** : ces valeurs viennent de la Base Adresse Nationale, et rien ne
 * doit modifier ce qui en vient.
 */
export const arrondirCoordonnees = ({ latitude, longitude }: Coordonnees): Coordonnees => ({
  latitude: Number(latitude.toFixed(DECIMALES_UTILES)),
  longitude: Number(longitude.toFixed(DECIMALES_UTILES))
});
