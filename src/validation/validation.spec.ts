import { describe, expect, it } from 'vitest';
import type { z } from 'zod';
import { LieuPourLaCartographieSchema } from './assemblages';
import type { LieuMediationNumerique, Localisation, Services } from '../models';
import { Adresse, Siret } from '../models';
import type { LieuPourLaCartographie } from './assemblages';

const lieuValide = {
  id: 'Reims_1',
  nom: 'Anonymal',
  pivot: '43575434300018',
  adresse: { voie: '12 rue des Acacias', code_postal: '51100', code_insee: '51454', commune: 'Reims' },
  localisation: { latitude: 49.25, longitude: 4.03 },
  services: ['Aide aux démarches administratives']
};

const conformeAuModele = (lieu: LieuPourLaCartographie): LieuMediationNumerique => lieu;

type LieuCartographiable = LieuMediationNumerique & { localisation: Localisation; services: Services };

const conformeALAssemblage = (lieu: LieuCartographiable): LieuPourLaCartographie => lieu;

describe("l'assemblage et le modèle décrivent la même chose", (): void => {
  it('should hand back a place the model accepts', (): void => {
    const resultat = LieuPourLaCartographieSchema.safeParse(lieuValide);

    expect(resultat.success).toBe(true);
    expect(resultat.success ? conformeAuModele(resultat.data) : null).toStrictEqual(resultat.success ? resultat.data : null);
  });

  it('should accept a place of the model that carries what it requires', (): void => {
    const resultat = LieuPourLaCartographieSchema.safeParse(lieuValide);
    const lieu: LieuCartographiable | null = resultat.success ? resultat.data : null;

    expect(lieu == null ? null : conformeALAssemblage(lieu)).toStrictEqual(lieu);
  });
});

describe('le schéma d’un modèle est celui de son constructeur', (): void => {
  it('should accept what the constructor accepts', (): void => {
    expect(Siret.schema.safeParse('43575434300018').success).toBe(true);
  });

  it('should refuse what the constructor refuses', (): void => {
    expect(Siret.schema.safeParse('12345678910111').success).toBe(false);
  });

  it('should normalize exactly like the constructor does', (): void => {
    expect(Siret.schema.parse('435 754 343 00018')).toBe(Siret('435 754 343 00018'));
  });
});

describe('toutes les erreurs, en une passe', (): void => {
  it('should report every faulty field of an address at once, each with its path', (): void => {
    const resultat = Adresse.schema.safeParse({ voie: '', code_postal: '999', code_insee: '96001', commune: 'Reims!!' });

    expect(resultat.success).toBe(false);
    expect(
      resultat.success ? [] : resultat.error.issues.map((probleme: z.core.$ZodIssue): string => probleme.path.join('.'))
    ).toStrictEqual(['voie', 'code_postal', 'code_insee', 'commune']);
  });

  it('should report every faulty field of a place at once', (): void => {
    const resultat = LieuPourLaCartographieSchema.safeParse({
      ...lieuValide,
      id: 'avec espace',
      pivot: '00000000000000',
      localisation: { latitude: 4.83, longitude: 45.76 },
      services: [],
      horaires: 'Mo-Sun 08:30-12:30',
      contact: { telephone: '0102030405', courriels: ['pas-une-adresse'], site_web: ['htpps://a.fr'] }
    });

    expect(
      resultat.success ? [] : resultat.error.issues.map((probleme: z.core.$ZodIssue): string => probleme.path.join('.'))
    ).toStrictEqual([
      'id',
      'pivot',
      'localisation',
      'services',
      'horaires',
      'contact.telephone',
      'contact.courriels.0',
      'contact.site_web.0'
    ]);
  });
});

describe("l'assemblage pour la cartographie", (): void => {
  it('should accept a complete place', (): void => {
    expect(LieuPourLaCartographieSchema.safeParse(lieuValide).success).toBe(true);
  });

  it('should accept a place without a pivot', (): void => {
    const sansPivot = { ...lieuValide, pivot: undefined };

    expect(LieuPourLaCartographieSchema.safeParse(sansPivot).success).toBe(true);
  });

  it('should refuse a place that announces no service', (): void => {
    expect(LieuPourLaCartographieSchema.safeParse({ ...lieuValide, services: [] }).success).toBe(false);
  });

  it('should refuse a name made of spaces', (): void => {
    expect(LieuPourLaCartographieSchema.safeParse({ ...lieuValide, nom: '   ' }).success).toBe(false);
  });
});
