export class CodePostalError extends Error {
  constructor(codePostal: string) {
    super(`Le code postal ${codePostal} n'est pas valide`);
  }
}
