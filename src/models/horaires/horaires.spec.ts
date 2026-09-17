import { describe, expect, it } from 'vitest';
import { Horaires } from './horaires';

describe('horaires model', (): void => {
  it.each([
    ['Mo-Fr 09:00-16:00'],
    ['Tu,Th 08:30-12:00,13:30-17:00'],
    ['Mo-Fr 08:30-17:00; Sa off'],
    ['24/7'],
    ['week 1-53/2 Mo 09:00-12:00'],
    ['Mo 09:00-12:00 "sur rendez-vous"'],
    ['PH off']
  ])('accepte %s', (horaires: string): void => {
    expect(Horaires(horaires)).toBe(horaires);
  });

  it('refuse un jour qu’OpenStreetMap ne connaît pas', (): void => {
    expect(Horaires.safe('Mo-Sun 08:30-12:30')).toBeNull();
  });

  it.each([['Th :undefined-17:00'], ['We 10-21:300-13'], ['Sa 10-1828:201'], ['']])(
    'refuse la valeur corrompue %s',
    (horaires: string): void => {
      expect(Horaires.safe(horaires)).toBeNull();
    }
  );
});
