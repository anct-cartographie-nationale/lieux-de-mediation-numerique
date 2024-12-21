import { describe, it, expect } from 'vitest';
import { PublicSpecifiquementAdresse, PublicsSpecifiquementAdresses } from './publics-specifiquement-adresses';
import { PublicsSpecifiquementAdressesError } from './errors';

describe('public specifiquement adresses model', (): void => {
  it('should create valid publics accueillis', (): void => {
    const publicsSpecifiquementAdresses: PublicsSpecifiquementAdresses = PublicsSpecifiquementAdresses([
      PublicSpecifiquementAdresse.Etudiants
    ]);

    expect(publicsSpecifiquementAdresses).toStrictEqual([PublicSpecifiquementAdresse.Etudiants]);
  });

  it('should not create invalid publics specifiquement adresses', (): void => {
    expect((): void => {
      PublicsSpecifiquementAdresses(['Adultes' as PublicSpecifiquementAdresse]);
    }).toThrow(new PublicsSpecifiquementAdressesError('Adultes' as PublicSpecifiquementAdresse));
  });

  it('should not create invalid publics specifiquement adresses containing a valid and an invalid value', (): void => {
    expect((): void => {
      PublicsSpecifiquementAdresses([PublicSpecifiquementAdresse.Etudiants, 'Adultes' as PublicSpecifiquementAdresse]);
    }).toThrow(new PublicsSpecifiquementAdressesError('Adultes' as PublicSpecifiquementAdresse));
  });
});
