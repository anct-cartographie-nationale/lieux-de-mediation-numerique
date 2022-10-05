export class LongitudeError extends Error {
  constructor(longitude: number | 'indéfinie') {
    super(`La longitude ${longitude} n'est pas valide`);
  }
}
