import { isValidUrl, Url } from '../url';

const PREFIXE_ACCES_LIBRE = 'https://acceslibre.beta.gouv.fr/';

/**
 * Le champ désigne une fiche Accès Libre, pas un site quelconque. Six des 305 fiches du jeu
 * national pointaient ailleurs, dont l'une vers un site de partage de photos, publiée comme
 * fiche d'accessibilité.
 */
export const isValidFicheAccesLibre = (url: string): url is Url => isValidUrl(url) && url.startsWith(PREFIXE_ACCES_LIBRE);
