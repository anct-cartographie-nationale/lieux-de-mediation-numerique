import { LocalisationToValidate } from '../../models';

/**
 * Distance entre deux points, en mètres.
 *
 * L'approximation équirectangulaire projette l'écart de longitude sur le
 * parallèle avant d'appliquer Pythagore. À l'échelle où l'on juge deux lieux —
 * quelques centaines de mètres — son écart à la formule de haversine est très
 * inférieur au mètre, pour un coût presque identique à celui d'une distance
 * cartésienne.
 *
 * Ce détour n'est pas cosmétique : comparer des degrés bruts donne un seuil qui
 * varie avec la latitude, un degré de longitude valant environ 73 km en
 * métropole et davantage près de l'équateur. Le même seuil serait donc plus
 * permissif dans les outre-mer que dans le Nord.
 */

const RAYON_TERRESTRE_EN_METRES: 6_371_000 = 6_371_000 as const;

const EN_RADIANS: number = Math.PI / 180;

// La forme non validée est acceptée en entrée : une `Localisation` construite en
// est un sous-type, si bien que les deux passent. C'est ce qui permet à un
// consommateur de comparer des coordonnées venues de sa base sans les reconstruire.
export const distanceEnMetres = (une: LocalisationToValidate, autre: LocalisationToValidate): number =>
  ((deltaLatitude: number, deltaLongitude: number, latitudeMoyenne: number): number =>
    RAYON_TERRESTRE_EN_METRES * Math.sqrt(deltaLatitude ** 2 + (deltaLongitude * Math.cos(latitudeMoyenne)) ** 2))(
    (autre.latitude - une.latitude) * EN_RADIANS,
    (autre.longitude - une.longitude) * EN_RADIANS,
    ((une.latitude + autre.latitude) / 2) * EN_RADIANS
  );
