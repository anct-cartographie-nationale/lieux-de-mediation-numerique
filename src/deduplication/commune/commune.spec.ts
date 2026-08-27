import { describe, it, expect } from 'vitest';
import { memeCommune } from './commune';

describe('memeCommune', (): void => {
  it.each([
    ['75101', '75056'],
    ['75120', '75056'],
    ['69381', '69123'],
    ['69389', '69123'],
    ['13201', '13055'],
    ['13216', '13055']
  ])('should recognise municipal district %s as its city %s', (arrondissement: string, ville: string): void => {
    expect(memeCommune(arrondissement, ville)).toBe(true);
  });

  it('should recognise two districts of the same city', (): void => {
    expect(memeCommune('75101', '75118')).toBe(true);
  });

  it.each([
    ['75121', '75056'],
    ['69390', '69123'],
    ['13217', '13055']
  ])('should keep %s apart from %s, just outside the district range', (dehors: string, ville: string): void => {
    expect(memeCommune(dehors, ville)).toBe(false);
  });

  it.each([
    ['75056', '69123'],
    ['53000', '44109']
  ])('should separate the distinct communes %s and %s', (une: string, autre: string): void => {
    expect(memeCommune(une, autre)).toBe(false);
  });

  it.each([['75056'], ['69123'], ['13055'], ['53000'], ['44109']])(
    'should recognise code %s as itself',
    (codeInsee: string): void => {
      expect(memeCommune(codeInsee, codeInsee)).toBe(true);
    }
  );

  it.each([
    [null, '75056'],
    ['75056', null],
    [undefined, '75056'],
    ['', '75056']
  ])('should not conclude anything without both codes (%s, %s)', (une, autre): void => {
    expect(memeCommune(une, autre)).toBe(false);
  });
});
