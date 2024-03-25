import { Courriel } from './courriel';
import { CourrielError } from './errors';

describe('courriel model', (): void => {
  it('should create a valid courriel', (): void => {
    const courrielData: string = 'test@gmail.com';

    const courriel: Courriel = Courriel(courrielData);

    expect(courriel).toStrictEqual(courrielData as Courriel);
  });

  it('should throw CourrielError when email do not have at symbole or domain extension', (): void => {
    const courrielData: string = 'test@gmail';

    expect((): void => {
      Courriel(courrielData);
    }).toThrow(new CourrielError(courrielData));
  });
});
