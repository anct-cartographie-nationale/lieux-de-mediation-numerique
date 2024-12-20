import { Model } from '../model';
import { ItineranceError } from './errors';

export enum Itinerance {
  Itinerant = 'Itinérant',
  Fixe = 'Fixe'
}

export type Itinerances = Model<'Itinerances', Itinerance[]>;

export type ItineranceIndefinie = 'itinerance indéfinie';

const firstInvalidItinerance = (itinerance: Itinerance): boolean => !Object.values(Itinerance).includes(itinerance);

const throwItineranceError = (itinerances: Itinerance[]): Itinerances => {
  throw new ItineranceError(itinerances.find(firstInvalidItinerance) ?? 'itinerance indéfinie');
};

const isItinerance = (itinerances: Itinerance[]): itinerances is Itinerances =>
  itinerances.find(firstInvalidItinerance) == null;

export const Itinerances = (itinerances: Itinerance[]): Itinerances =>
  isItinerance(itinerances) ? itinerances : throwItineranceError(itinerances);
