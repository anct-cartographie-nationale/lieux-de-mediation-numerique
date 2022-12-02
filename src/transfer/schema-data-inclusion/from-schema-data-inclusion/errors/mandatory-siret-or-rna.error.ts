export class MandatorySiretOrRnaError extends Error {
  constructor() {
    super('Le SIRET ou le RNA est obligatoire');
  }
}
