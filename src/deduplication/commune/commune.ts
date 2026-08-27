/**
 * Commune d'un lieu, ramenée à un code unique.
 *
 * Paris, Lyon et Marseille sont désignées tantôt par leur code de commune,
 * tantôt par celui de l'arrondissement : deux fiches du même lieu peuvent donc
 * porter 75056 et 75118 sans se contredire. Comparer les codes bruts les
 * sépare, et le doublon passe inaperçu.
 *
 * Ces trois villes sont les seules concernées par les arrondissements
 * municipaux — la table est donc close, et le restera.
 */

type ArrondissementsMunicipaux = {
  readonly commune: string;
  readonly premier: number;
  readonly dernier: number;
};

const arrondissementsMunicipaux: readonly ArrondissementsMunicipaux[] = [
  { commune: '75056', premier: 75101, dernier: 75120 },
  { commune: '69123', premier: 69381, dernier: 69389 },
  { commune: '13055', premier: 13201, dernier: 13216 }
];

const contient = (codeInsee: string) => (arrondissements: ArrondissementsMunicipaux) =>
  Number(codeInsee) >= arrondissements.premier && Number(codeInsee) <= arrondissements.dernier;

/**
 * Code INSEE ramené à celui de sa commune : un arrondissement municipal rend le
 * code de la ville dont il relève, tout autre code se rend lui-même.
 */
export const normaliserCodeInsee = (codeInsee: string): string =>
  arrondissementsMunicipaux.find(contient(codeInsee))?.commune ?? codeInsee;

/**
 * Deux lieux sont-ils dans la même commune ?
 *
 * Un code absent d'un côté ne vaut pas concordance : sans commune, rien ne
 * borne la comparaison, et deux lieux homonymes du territoire se rapprocheraient.
 */
export const memeCommune = (unCodeInsee: string | null | undefined, autreCodeInsee: string | null | undefined): boolean =>
  unCodeInsee != null &&
  autreCodeInsee != null &&
  unCodeInsee !== '' &&
  normaliserCodeInsee(unCodeInsee) === normaliserCodeInsee(autreCodeInsee);
