export class RnaError extends Error {
  constructor(rna: string) {
    super(`Le Rna ${rna} n'est pas valide`);
  }
}
