/**
 * Les emprises françaises, métropole et outre-mer.
 *
 * Les bornes du globe — ±90 et ±180 — laissent passer une inversion latitude/longitude : le
 * jeu national publie « Bus France services de Cap Nord Martinique » en `lat = -61,028`, au
 * large de l'Afrique du Sud, et `-61` est une latitude parfaitement valide.
 *
 * Vérifié sur les 18769 lieux du jeu national : **un seul** tombe hors de ces emprises, et
 * c'est précisément celui dont les coordonnées sont inversées.
 */
export type Emprise = {
  nom: string;
  latitudeMinimale: number;
  latitudeMaximale: number;
  longitudeMinimale: number;
  longitudeMaximale: number;
};

export const EMPRISES: readonly Emprise[] = [
  {
    nom: 'Métropole et Corse',
    latitudeMinimale: 41.3,
    latitudeMaximale: 51.2,
    longitudeMinimale: -5.2,
    longitudeMaximale: 9.6
  },
  {
    nom: 'Guadeloupe, Saint-Martin, Saint-Barthélemy',
    latitudeMinimale: 15.8,
    latitudeMaximale: 18.2,
    longitudeMinimale: -63.2,
    longitudeMaximale: -60.8
  },
  { nom: 'Martinique', latitudeMinimale: 14.3, latitudeMaximale: 15.0, longitudeMinimale: -61.3, longitudeMaximale: -60.7 },
  { nom: 'Guyane', latitudeMinimale: 2.0, latitudeMaximale: 6.0, longitudeMinimale: -54.7, longitudeMaximale: -51.5 },
  { nom: 'La Réunion', latitudeMinimale: -21.5, latitudeMaximale: -20.7, longitudeMinimale: 55.1, longitudeMaximale: 55.9 },
  { nom: 'Mayotte', latitudeMinimale: -13.1, latitudeMaximale: -12.6, longitudeMinimale: 45.0, longitudeMaximale: 45.4 },
  {
    nom: 'Saint-Pierre-et-Miquelon',
    latitudeMinimale: 46.7,
    latitudeMaximale: 47.2,
    longitudeMinimale: -56.5,
    longitudeMaximale: -56.1
  },
  {
    nom: 'Nouvelle-Calédonie',
    latitudeMinimale: -22.8,
    latitudeMaximale: -19.5,
    longitudeMinimale: 163.5,
    longitudeMaximale: 168.2
  },
  {
    nom: 'Polynésie française',
    latitudeMinimale: -28.0,
    latitudeMaximale: -7.8,
    longitudeMinimale: -154.8,
    longitudeMaximale: -134.4
  },
  {
    nom: 'Wallis-et-Futuna',
    latitudeMinimale: -14.4,
    latitudeMaximale: -13.2,
    longitudeMinimale: -178.3,
    longitudeMaximale: -176.1
  },
  {
    nom: 'Terres australes et antarctiques',
    latitudeMinimale: -50.0,
    latitudeMaximale: -37.0,
    longitudeMinimale: 50.0,
    longitudeMaximale: 78.0
  }
];

export const dansUneEmpriseFrancaise = (latitude: number, longitude: number): boolean =>
  EMPRISES.some(
    (emprise: Emprise): boolean =>
      latitude >= emprise.latitudeMinimale &&
      latitude <= emprise.latitudeMaximale &&
      longitude >= emprise.longitudeMinimale &&
      longitude <= emprise.longitudeMaximale
  );

/**
 * Une inversion avérée : le couple échangé tombe dans une emprise, le couple d'origine non.
 * C'est la cause la plus probable, et la seule qu'on sache reconnaître sans deviner.
 */
export const estInverse = (latitude: number, longitude: number): boolean =>
  !dansUneEmpriseFrancaise(latitude, longitude) && dansUneEmpriseFrancaise(longitude, latitude);
