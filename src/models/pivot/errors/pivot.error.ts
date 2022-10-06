export class PivotError extends Error {
  constructor(pivot: string) {
    super(`Le Pivot ${pivot} n'est pas valide`);
  }
}
