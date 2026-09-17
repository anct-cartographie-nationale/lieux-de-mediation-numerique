import { describe, expect, it } from 'vitest';
import { Itinerance, Itinerances } from './itinerances';

describe('itinerance model', (): void => {
  it('should create valid itinerance', (): void => {
    const conditionAcces: Itinerances = Itinerances([Itinerance.Itinerant]);

    expect(conditionAcces).toStrictEqual(['Itinérant']);
  });

  it('should not create invalid conditions acces', (): void => {
    expect(Itinerances.safe(['À domicile' as Itinerance])).toBeNull();
  });

  it('should not create invalid itinerance containing a valid and an invalid value', (): void => {
    expect(Itinerances.safe([Itinerance.Fixe, 'À domicile' as Itinerance])).toBeNull();
  });
});
