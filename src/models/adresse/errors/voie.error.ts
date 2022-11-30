export class VoieError extends Error {
  constructor(voie: string) {
    super(`Le voie ${voie} n'est pas valide`);
  }
}
