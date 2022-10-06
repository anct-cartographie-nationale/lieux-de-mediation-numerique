export class SiretError extends Error {
  constructor(siret: string) {
    super(`Le Siret ${siret} n'est pas valide`);
  }
}
