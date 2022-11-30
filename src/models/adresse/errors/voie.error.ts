export class VoieError extends Error {
  constructor(voie: string) {
    super(`La voie ${voie} n'est pas valide`);
  }
}
