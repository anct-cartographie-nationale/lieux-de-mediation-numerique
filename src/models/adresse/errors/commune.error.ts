export class CommuneError extends Error {
  constructor(commune: string) {
    super(`La commune ${commune} contient des caractères invalides`);
  }
}
