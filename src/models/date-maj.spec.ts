import { describe, expect, it } from 'vitest';
import { dateMajSiLisible } from './date-maj';

describe('dateMajSiLisible', (): void => {
  it('rend la date quand elle est lisible', (): void => {
    expect(dateMajSiLisible('2022-10-10')).toStrictEqual({ date_maj: new Date('2022-10-10') });
  });

  it('accepte une date déjà construite', (): void => {
    expect(dateMajSiLisible(new Date('2022-10-10'))).toStrictEqual({ date_maj: new Date('2022-10-10') });
  });

  it.each([[undefined], [null]])('rend un objet vide pour une date absente (%s)', (dateMaj): void => {
    expect(dateMajSiLisible(dateMaj)).toStrictEqual({});
  });

  it.each([['pas une date'], ['2022-13-45'], ['']])('rend un objet vide pour la date illisible %s', (dateMaj): void => {
    expect(dateMajSiLisible(dateMaj)).toStrictEqual({});
  });

  it('rend un objet vide pour un Date invalide', (): void => {
    expect(dateMajSiLisible(new Date('pas une date'))).toStrictEqual({});
  });
});
