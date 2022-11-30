import { ModelError } from '../../../errors';

export class UrlError extends ModelError<{ url: string }> {
  constructor(url: string) {
    super('url', `Le format de l'url ${url} n'est pas valide`);
  }
}
