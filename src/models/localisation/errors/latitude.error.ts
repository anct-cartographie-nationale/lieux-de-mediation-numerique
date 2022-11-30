import { ModelError } from '../../../errors';
import { Localisation } from '../localisation';

export class LatitudeError extends ModelError<Localisation> {
  constructor(latitude: number | 'indéfinie') {
    super('latitude', `La latitude ${latitude} n'est pas valide`);
  }
}
