export class LatitudeError extends Error {
  constructor(latitude: number | 'indéfinie') {
    super(`La latitude ${latitude} n'est pas valide`);
  }
}
