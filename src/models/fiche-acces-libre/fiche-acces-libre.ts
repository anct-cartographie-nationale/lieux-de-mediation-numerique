import { defineModel, type Model } from '../model';
import { Url } from '../url';

const PREFIXE_ACCES_LIBRE = 'https://acceslibre.beta.gouv.fr/';

export const FicheAccesLibre = defineModel(
  Url.schema
    .refine((url: string): boolean => url.startsWith(PREFIXE_ACCES_LIBRE), {
      error: `La fiche doit être une fiche Accès Libre (${PREFIXE_ACCES_LIBRE}…)`
    })
    .brand('FicheAccesLibre')
);

export type FicheAccesLibre = Model.TypeOf<typeof FicheAccesLibre>;
