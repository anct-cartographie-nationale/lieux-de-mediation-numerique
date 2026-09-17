import { describe, expect, it } from 'vitest';
import { Adresse, type AdresseToValidate } from './adresse';

describe('adresse model', (): void => {
  it('construit une adresse valide', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '57260',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData });
  });

  it('refuse un code postal invalide', (): void => {
    expect(Adresse.safe({ voie: '4 rue des Acacias', code_postal: 'error', code_insee: '57260', commune: 'Metz' })).toBeNull();
  });

  it.each([
    ['error'],

    ['380546'],
    ['5723687'],
    ['38-2-33-546'],
    ['20004']
  ])('refuse le code insee %s', (code_insee: string): void => {
    expect(Adresse.safe({ voie: '4 rue des Acacias', code_postal: '57100', code_insee, commune: 'Metz' })).toBeNull();
  });

  it.each([
    ['Corse', '20000', '2A004'],
    ['Saint-Barthélemy', '97133', '97701'],
    ['Nouvelle-Calédonie', '98800', '98818'],
    ['Polynésie française', '98700', '98735'],
    ['arrondissement de Paris', '75001', '75101'],
    ['arrondissement de Lyon', '69001', '69381'],
    ['arrondissement de Marseille', '13001', '13201']
  ])('accepte le code insee de %s', (_: string, code_postal: string, code_insee: string): void => {
    expect(Adresse({ voie: '4 rue des Acacias', code_postal, code_insee, commune: 'Commune' }).code_insee).toBe(code_insee);
  });

  it('accepte une adresse sans code insee', (): void => {
    expect(Adresse({ voie: '4 rue des Acacias', code_postal: '57100', commune: 'Metz' })).toStrictEqual({
      voie: '4 rue des Acacias',
      code_postal: '57100',
      commune: 'Metz'
    });
  });

  it('conserve le complément d’adresse', (): void => {
    expect(
      Adresse({ voie: '4 rue des Acacias', complement_adresse: 'Bâtiment B', code_postal: '57100', commune: 'Metz' })
        .complement_adresse
    ).toBe('Bâtiment B');
  });

  it('refuse une voie vide', (): void => {
    expect(Adresse.safe({ voie: '', code_postal: '57100', commune: 'Metz' })).toBeNull();
  });

  it('refuse une commune qui n’en est pas une', (): void => {
    expect(Adresse.safe({ voie: '4 rue des Acacias', code_postal: '57100', commune: 'Metz *' })).toBeNull();
  });

  it('rend toutes les erreurs d’une adresse en une passe', (): void => {
    const resultat = Adresse.schema.safeParse({ voie: '', code_postal: 'error', code_insee: 'error', commune: 'Metz *' });

    expect(resultat.success).toBe(false);
    expect(resultat.error?.issues.map((issue): PropertyKey | undefined => issue.path[0])).toStrictEqual([
      'voie',
      'code_postal',
      'code_insee',
      'commune'
    ]);
  });

  it.each([['00000'], ['96000'], ['99999']])(
    'refuse le code postal %s, qui ne désigne aucun département',
    (code_postal: string): void => {
      expect(Adresse.safe({ voie: '4 rue des Acacias', code_postal, commune: 'Metz' })).toBeNull();
    }
  );

  it.each([['12345'], ['   '], ['-'], ['M']])('refuse la commune %s', (commune: string): void => {
    expect(Adresse.safe({ voie: '4 rue des Acacias', code_postal: '57100', commune })).toBeNull();
  });

  it.each([['12345'], ['   '], ['0'], ['.']])('refuse la voie %s, qui ne porte aucune lettre', (voie: string): void => {
    expect(Adresse.safe({ voie, code_postal: '57100', commune: 'Metz' })).toBeNull();
  });

  it('refuse un complément d’adresse hors charte, là où rien ne le contrôlait', (): void => {
    expect(
      Adresse.safe({
        voie: '4 rue des Acacias',
        complement_adresse: 'ZAE Joncquier & Morelles',
        code_postal: '57100',
        commune: 'Metz'
      })
    ).toBeNull();
  });
});
