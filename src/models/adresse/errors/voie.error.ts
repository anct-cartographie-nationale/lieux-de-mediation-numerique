export class VoieError extends Error {
  constructor() {
    super('La voie ne peut pas être vide');
  }
}
