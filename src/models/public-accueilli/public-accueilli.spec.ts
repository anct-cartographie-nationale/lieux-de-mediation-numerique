import { PublicAccueilli, PublicsAccueillis } from './public-accueilli';
import { PublicsAccueillisError } from './errors';

describe('public accueilli model', (): void => {
  it('should create a valid publics accueillis', (): void => {
    const publicsAccueillis: PublicsAccueillis = PublicsAccueillis([PublicAccueilli.Adultes]);

    expect(publicsAccueillis).toStrictEqual([PublicAccueilli.Adultes]);
  });

  it('should not create invalid publics accueillis', (): void => {
    expect((): void => {
      PublicsAccueillis(['Personnes autistes' as PublicAccueilli]);
    }).toThrow(new PublicsAccueillisError('Personnes autistes' as PublicAccueilli));
  });

  it('should not create invalid publics accueillis containing a valid and an invalid value', (): void => {
    expect((): void => {
      PublicsAccueillis([PublicAccueilli.Adultes, 'Personnes autistes' as PublicAccueilli]);
    }).toThrow(new PublicsAccueillisError('Personnes autistes' as PublicAccueilli));
  });
});
