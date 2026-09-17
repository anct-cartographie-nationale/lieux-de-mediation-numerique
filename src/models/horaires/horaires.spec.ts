import { describe, it, expect } from 'vitest';
import { Horaires } from './horaires';
import { HorairesError } from './errors';

describe('horaires model', (): void => {
  it.each([
    ['Mo-Fr 09:00-16:00'],
    ['Tu,Th 08:30-12:00,13:30-17:00'],
    ['Mo-Fr 08:30-17:00; Sa off'],
    ['24/7'],
    ['week 1-53/2 Mo 09:00-12:00'],
    ['Mo 09:00-12:00 "sur rendez-vous"'],
    ['PH off']
  ])('should accept %s', (horaires: string): void => {
    expect(Horaires(horaires)).toBe(horaires);
  });

  /** `Sun` n'existe pas en OpenStreetMap : c'est `Su`. 111 lieux du jeu national l'écrivent. */
  it('should refuse a day that OpenStreetMap does not know', (): void => {
    expect((): void => {
      Horaires('Mo-Sun 08:30-12:30');
    }).toThrow(new HorairesError('Mo-Sun 08:30-12:30'));
  });

  /** Le mot `undefined` de JavaScript a fui dans 551 valeurs publiques. */
  it.each([['Th :undefined-17:00'], ['We 10-21:300-13'], ['Sa 10-1828:201'], ['']])(
    'should refuse the corrupted %s',
    (horaires: string): void => {
      expect((): void => {
        Horaires(horaires);
      }).toThrow(new HorairesError(horaires));
    }
  );
});
