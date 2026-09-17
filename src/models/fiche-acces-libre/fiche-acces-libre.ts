import { defineModel, type Model } from '../model';
import { Url } from '../url';

const PREFIXE_ACCES_LIBRE = 'https://acceslibre.beta.gouv.fr/';

/**
 * Le champ désigne une fiche Accès Libre, pas un site quelconque. Six des 305 fiches du jeu
 * national pointaient ailleurs, dont l'une vers un site de partage de photos, publiée comme
 * fiche d'accessibilité.
 *
 * Le schéma part de celui de `Url` : une fiche Accès Libre est une URL, et le type le dit —
 * une `FicheAccesLibre` s'emploie partout où une `Url` est attendue, l'inverse est refusé.
 */
export const FicheAccesLibre = defineModel(
  Url.schema
    .refine((url: string): boolean => url.startsWith(PREFIXE_ACCES_LIBRE), {
      error: `La fiche doit être une fiche Accès Libre (${PREFIXE_ACCES_LIBRE}…)`
    })
    .brand('FicheAccesLibre')
);

export type FicheAccesLibre = Model.TypeOf<typeof FicheAccesLibre>;
