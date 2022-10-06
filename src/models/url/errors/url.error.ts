export class UrlError extends Error {
  constructor(url: string) {
    super(`Le format de l'url ${url} n'est pas valide`);
  }
}
