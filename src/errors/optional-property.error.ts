export class OptionalPropertyError extends Error {
  constructor(public readonly key: string, message: string) {
    super(message);
  }
}
