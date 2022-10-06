import { Model } from '../model';
import { PublicsAccueillisError } from './errors';

export enum PublicAccueilli {
  Adultes = 'Adultes',
  DeficienceVisuelle = 'Déficience visuelle',
  FamillesEnfants = 'Familles/enfants',
  HandicapsPsychiques = 'Handicaps psychiques : troubles psychiatriques donnant lieu à des atteintes comportementales',
  Jeunes = 'Jeunes (16-26 ans)',
  LanguesEtrangeres = 'Public langues étrangères',
  Seniors = 'Seniors (+ 65 ans)',
  Surdite = 'Surdité',
  UniquementFemmes = 'Uniquement femmes',
  HandicapsMentaux = "Handicaps mentaux : déficiences limitant les activités d'une personne",
  Illettrisme = "Personnes en situation d'illettrisme"
}

export type PublicsAccueillis = Model<'PublicsAccueillis', PublicAccueilli[]>;

export type PublicAccueilliIndefini = 'public accueilli indéfini';

const firstInvalidPublicAccueilli = (publicAccueilli: PublicAccueilli): boolean =>
  !Object.values(PublicAccueilli).includes(publicAccueilli);

const throwPublicsAccueillisError = (publicsAccueillis: PublicAccueilli[]): PublicsAccueillis => {
  throw new PublicsAccueillisError(publicsAccueillis.find(firstInvalidPublicAccueilli) ?? 'public accueilli indéfini');
};

const isPublicsAccueillis = (publicsAccueillis: PublicAccueilli[]): publicsAccueillis is PublicsAccueillis =>
  publicsAccueillis.find(firstInvalidPublicAccueilli) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const PublicsAccueillis = (publicsAccueillis: PublicAccueilli[]): PublicsAccueillis =>
  isPublicsAccueillis(publicsAccueillis)
    ? (publicsAccueillis as PublicsAccueillis)
    : throwPublicsAccueillisError(publicsAccueillis);
