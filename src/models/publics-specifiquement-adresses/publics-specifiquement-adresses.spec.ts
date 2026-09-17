import { describe, expect, it } from 'vitest';
import { PublicSpecifiquementAdresse, PublicsSpecifiquementAdresses } from './publics-specifiquement-adresses';

describe('public specifiquement adresses model', (): void => {
  it('should create valid publics accueillis', (): void => {
    const publicsSpecifiquementAdresses: PublicsSpecifiquementAdresses = PublicsSpecifiquementAdresses([
      PublicSpecifiquementAdresse.Etudiants
    ]);

    expect(publicsSpecifiquementAdresses).toStrictEqual([PublicSpecifiquementAdresse.Etudiants]);
  });

  it('should not create invalid publics specifiquement adresses', (): void => {
    expect(PublicsSpecifiquementAdresses.safe(['Adultes' as PublicSpecifiquementAdresse])).toBeNull();
  });

  it('should not create invalid publics specifiquement adresses containing a valid and an invalid value', (): void => {
    expect(
      PublicsSpecifiquementAdresses.safe([PublicSpecifiquementAdresse.Etudiants, 'Adultes' as PublicSpecifiquementAdresse])
    ).toBeNull();
  });
});
