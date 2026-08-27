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

export const normaliserCodeInsee = (codeInsee: string): string =>
  arrondissementsMunicipaux.find(contient(codeInsee))?.commune ?? codeInsee;

export const memeCommune = (unCodeInsee: string | null | undefined, autreCodeInsee: string | null | undefined): boolean =>
  unCodeInsee != null &&
  autreCodeInsee != null &&
  unCodeInsee !== '' &&
  normaliserCodeInsee(unCodeInsee) === normaliserCodeInsee(autreCodeInsee);
