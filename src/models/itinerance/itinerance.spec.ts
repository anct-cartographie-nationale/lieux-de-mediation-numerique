import { describe, it, expect } from 'vitest';
import { Itinerance, Itinerances } from './itinerances';
import { ItineranceError } from './errors';

describe('itinerance model', (): void => {
  it('should create valid itinerance', (): void => {
    const conditionAcces: Itinerances = Itinerances([Itinerance.Itinerant]);

    expect(conditionAcces).toStrictEqual(['Itinérant']);
  });

  it('should not create invalid conditions acces', (): void => {
    expect((): void => {
      Itinerances(['À domicile' as Itinerance]);
    }).toThrow(new ItineranceError('À domicile' as Itinerance));
  });

  it('should not create invalid itinerance containing a valid and an invalid value', (): void => {
    expect((): void => {
      Itinerances([Itinerance.Fixe, 'À domicile' as Itinerance]);
    }).toThrow(new ItineranceError('À domicile' as Itinerance));
  });
});
