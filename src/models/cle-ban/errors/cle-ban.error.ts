export class CleBanError extends Error {
  constructor(cleBan: string) {
    super(`Le CleBan ${cleBan} n'est pas valide`);
  }
}
