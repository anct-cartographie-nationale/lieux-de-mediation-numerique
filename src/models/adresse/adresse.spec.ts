import { describe, it, expect } from 'vitest';
import { Adresse, AdresseToValidate } from './adresse';
import { CodeInseeError, CodePostalError, CommuneError, VoieError } from './errors';

describe('adresse model', (): void => {
  it('should create a valid address', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '57260',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should throw CodePostalError when code_postal is invalid', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: 'error',
      code_insee: '57260',
      commune: 'Metz'
    };

    expect((): void => {
      Adresse(adresseData);
    }).toThrow(new CodePostalError(adresseData.code_postal));
  });

  it('should throw CodeInseeError when code_insee is invalid', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: 'error',
      commune: 'Metz'
    };

    expect((): void => {
      Adresse(adresseData);
    }).toThrow(new CodeInseeError('error'));
  });

  it('should create a valid address with 6 digits for code insee including optional 0 after department code', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '38110',
      code_insee: '380546',
      commune: 'La Tour-du-Pin'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should throw CodeInseeError when code_insee is 7 digits', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '5723687',
      commune: 'Metz'
    };

    expect((): void => {
      Adresse(adresseData);
    }).toThrow(new CodeInseeError('5723687'));
  });

  it('should create a valid address with 8 digits code_insee', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '38100',
      code_insee: '38-2-33-546',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should create a valid address with code_insee in Corse', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '20100',
      code_insee: '2A100',
      commune: 'Ajaccio'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should create a valid address with commune containing accents', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '17410',
      code_insee: '17369',
      commune: 'Saint-Martin de Ré'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should create a valid address with commune containing apostrophes', (): void => {
    const adresseData: AdresseToValidate = {
      voie: 'Ante 1 rue Denfert Rochereau',
      code_postal: '79400',
      commune: 'Saint-Maixent-l’Ecole'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should create a valid address without code insee', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '17410',
      commune: 'Saint-Martin de Ré'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should throw CommuneError when commune contains $ invalid character', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz$'
    };

    expect((): void => {
      Adresse(adresseData);
    }).toThrow(new CommuneError(adresseData.commune));
  });

  it('should throw CommuneError when commune contains " invalid character', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '"Château de la Roche" Route de Louerre',
      code_postal: '49350',
      commune: 'Gennes-Val-de-Loire'
    };

    expect((): void => {
      Adresse(adresseData);
    }).toThrow(new VoieError(adresseData.voie));
  });

  it('should allow Commune with œ characters', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '69 Bd Clemenceau',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Marcq-en-Barœul'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should allow Commune with Œ (upper case) character', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '69 Bd Clemenceau',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'MARCQ-EN-BARŒUL'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should throw VoieError when voie is empty', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    expect((): void => {
      Adresse(adresseData);
    }).toThrow(new VoieError(adresseData.voie));
  });

  it('should accept comma in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '128, Rue Jean Jaurès',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept parentheses in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: 'Rond-Point Ibrahim Ali (1978-1995)',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept ° in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: 'APPARTEMENT N°3 1 R PIERRE LEMIÈRE',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept dot in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '5 ter. avenue des Sports',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept & in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: 'CENTRE VIE & LIBERTE 10 R DU DOYENNE',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept double dot in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: 'ADRESSE ADMINISTRATIVE : 8 R DES PECHEURS COUX',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept + in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: 'ACCUEIL FEMMES + ENFANTS 35 R FESSART',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept long dash in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '2067 chemin ST Claude – Nova Antipolis',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept pipe in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '1022 R Antoine de Saint-exupery | R Antoine Saint-exupery',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept semicolon in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: "53 Avenue de l'Europe Ecopolis; 1er étage bureau 09",
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });

  it('should accept slash in voie', (): void => {
    const adresseData: AdresseToValidate = {
      voie: '17/19 Rue du Colonel Driant',
      code_postal: '57100',
      code_insee: '57236',
      commune: 'Metz'
    };

    const adresse: Adresse = Adresse(adresseData);

    expect(adresse).toStrictEqual({ ...adresseData } as Adresse);
  });
});
