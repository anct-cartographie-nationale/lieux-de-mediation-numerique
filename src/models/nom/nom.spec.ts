import { Nom, NomToValidate } from './nom';
import { NomError } from './errors';

describe('nom model', (): void => {
  it('should create a valid nom', (): void => {
    const nomData: NomToValidate = '4cf5az948azc4z4';

    const nom: Nom = Nom(nomData);

    expect(nom).toBe('4cf5az948azc4z4');
  });

  it('should throw NomError when nom is null', (): void => {
    const nomData: NomToValidate = null as unknown as string;

    expect((): void => {
      Nom(nomData);
    }).toThrow(new NomError(nomData));
  });

  it('should throw NomError when nom is empty string', (): void => {
    const nomData: NomToValidate = '';

    expect((): void => {
      Nom(nomData);
    }).toThrow(new NomError(nomData));
  });
});
