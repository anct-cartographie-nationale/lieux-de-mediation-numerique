export class ModelError<T> extends Error {
  constructor(
    public readonly key: keyof T,
    message: string
  ) {
    super(message);
  }
}
