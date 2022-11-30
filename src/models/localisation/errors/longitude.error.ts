import { ModelError } from '../../../errors';
import { Localisation } from '../localisation';

export class LongitudeError extends ModelError<Localisation> {
  constructor(longitude: number | 'indéfinie') {
    super('longitude', `La longitude ${longitude} n'est pas valide`);
  }
}
