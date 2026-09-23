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

  const avecLaVoie = (voie: string): AdresseToValidate => ({ voie, code_postal: '57100', commune: 'Metz' });
  const avecLeComplement = (complement_adresse: string): AdresseToValidate => ({
    voie: '4 rue des Acacias',
    complement_adresse,
    code_postal: '57100',
    commune: 'Metz'
  });

  it.each([
    ['4 rue du Général de Gaulle – Bâtiment B'],
    ['Place de l’Hôtel de Ville — Mairie'],
    ['Résidence « Les Terrasses »'],
    ['Résidence “Les Terrasses”'],
    ['ZAE Joncquier & Morelles'],
    ['CRE@VALLEE BOULEVARD DES SAVEURS'],
    ['Centre culturel Le MI[X]']
  ])('accepte la voie %s, écrite comme on l’écrit à la main', (voie: string): void => {
    expect(Adresse(avecLaVoie(voie)).voie).toBe(voie);
  });

  it.each([['Groupe scolaire "Les Terrasses"'], ['12 rue des Acacias #3'], ['12 rue des Acacias; Metz'], ['Rue_de_la_Mairie']])(
    'refuse la voie %s, dont un caractère ne s’écrit pas dans une adresse',
    (voie: string): void => {
      expect(Adresse.safe(avecLaVoie(voie))).toBeNull();
    }
  );

  it.each([['-12 rue des Acacias'], ['@mairie rue des Acacias']])(
    'refuse la voie %s, qu’un tableur lirait comme une formule',
    (voie: string): void => {
      expect(Adresse.safe(avecLaVoie(voie))).toBeNull();
    }
  );

  it.each([['5'], ['163'], ['1034']])('accepte le complément d’adresse %s, un simple numéro', (complement: string): void => {
    expect(Adresse(avecLeComplement(complement)).complement_adresse).toBe(complement);
  });

  it.each([['77250'], ['06 02 16 12 33'], ['21850033800015'], [''], ['   '], ['-']])(
    'refuse le complément d’adresse %s, qui n’est ni un texte ni un numéro',
    (complement: string): void => {
      expect(Adresse.safe(avecLeComplement(complement))).toBeNull();
    }
  );

  it.each([['Marché des Halles – 1er étage'], ['Centre culturel Le MI[X]'], ['Espace « Arts & Métiers »']])(
    'accepte le complément d’adresse %s',
    (complement: string): void => {
      expect(Adresse(avecLeComplement(complement)).complement_adresse).toBe(complement);
    }
  );

  it.each([['Groupe scolaire "Les Terrasses"'], ['- Bâtiment B'], ['=1+1']])(
    'refuse le complément d’adresse %s, hors charte',
    (complement: string): void => {
      expect(Adresse.safe(avecLeComplement(complement))).toBeNull();
    }
  );
});
