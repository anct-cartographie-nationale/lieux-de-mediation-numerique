import { describe, it, expect } from 'vitest';
import { LieuPourLaCartographieSchema } from './assemblages';
import { AdresseSchema, SiretSchema } from './champs';

const lieuValide = {
  id: 'Reims_1',
  nom: 'Anonymal',
  pivot: '43575434300018',
  adresse: { voie: '12 rue des Acacias', code_postal: '51100', code_insee: '51454', commune: 'Reims' },
  localisation: { latitude: 49.25, longitude: 4.03 },
  services: ['Aide aux démarches administratives']
};

describe('les schémas réutilisent les règles du modèle', (): void => {
  it('should accept what the constructor accepts', (): void => {
    expect(SiretSchema.safeParse('43575434300018').success).toBe(true);
  });

  it('should refuse what the constructor refuses', (): void => {
    expect(SiretSchema.safeParse('12345678910111').success).toBe(false);
  });
});

describe('toutes les erreurs, en une passe', (): void => {
  /**
   * Le constructeur `Adresse` lève sur la voie et tait le code postal. Un producteur corrigeait
   * ses données une erreur à la fois, en relançant la chaîne entre chaque.
   */
  it('should report every faulty field of an address at once, each with its path', (): void => {
    const resultat = AdresseSchema.safeParse({ voie: '', code_postal: '999', code_insee: '96001', commune: 'Reims!!' });

    expect(resultat.success).toBe(false);
    expect(resultat.success ? [] : resultat.error.issues.map((probleme) => probleme.path.join('.'))).toStrictEqual([
      'voie',
      'code_postal',
      'code_insee',
      'commune'
    ]);
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

    expect(resultat.success ? [] : resultat.error.issues.map((probleme) => probleme.path.join('.'))).toStrictEqual([
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

  /** L'exigence vit dans l'assemblage, pas dans le champ : la coop admet la liste vide. */
  it('should refuse a place that announces no service', (): void => {
    expect(LieuPourLaCartographieSchema.safeParse({ ...lieuValide, services: [] }).success).toBe(false);
  });

  it('should refuse a name made of spaces', (): void => {
    expect(LieuPourLaCartographieSchema.safeParse({ ...lieuValide, nom: '   ' }).success).toBe(false);
  });
});
