import { describe, it, expect } from 'vitest';
import { memeCommune, normaliserCodeInsee } from './commune';

describe('normaliserCodeInsee', (): void => {
  it.each([
    ['75101', '75056'],
    ['75120', '75056'],
    ['69381', '69123'],
    ['69389', '69123'],
    ['13201', '13055'],
    ['13216', '13055']
  ])('should resolve municipal district %s to its city %s', (arrondissement: string, ville: string): void => {
    expect(normaliserCodeInsee(arrondissement)).toBe(ville);
  });

  it.each([['75056'], ['69123'], ['13055'], ['53000'], ['44109']])(
    'should leave code %s untouched',
    (codeInsee: string): void => {
      expect(normaliserCodeInsee(codeInsee)).toBe(codeInsee);
    }
  );

  it('should leave untouched a code just outside a district range', (): void => {
    expect(normaliserCodeInsee('75121')).toBe('75121');
    expect(normaliserCodeInsee('69390')).toBe('69390');
  });
});

describe('memeCommune', (): void => {
  it('should recognise the same commune written as city and as district', (): void => {
    expect(memeCommune('75056', '75118')).toBe(true);
  });

  it('should recognise two districts of the same city', (): void => {
    expect(memeCommune('75101', '75118')).toBe(true);
  });

  it('should separate two distinct communes', (): void => {
    expect(memeCommune('75056', '69123')).toBe(false);
  });

  it.each([
    [null, '75056'],
    ['75056', null],
    [undefined, '75056'],
    ['', '75056']
  ])('should not conclude anything without both codes (%s, %s)', (un, autre): void => {
    expect(memeCommune(un, autre)).toBe(false);
  });
});
