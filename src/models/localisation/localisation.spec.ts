import { describe, expect, it } from 'vitest';
import { Localisation, type LocalisationToValidate } from './localisation';

describe('localisation model', (): void => {
  it('construit une localisation valide', (): void => {
    const localisationData: LocalisationToValidate = { latitude: 45.7665478, longitude: 4.8375548 };

    const localisation: Localisation = Localisation(localisationData);

    expect(localisation).toStrictEqual({ ...localisationData });
  });

  it.each([
    ['une latitude sous -90', -91, 4.8375548],
    ['une latitude au-dessus de 90', 91, 4.8375548],
    ['une longitude sous -180', 4.8375548, -181],
    ['une longitude au-dessus de 180', 4.8375548, 181]
  ])('refuse %s', (_: string, latitude: number, longitude: number): void => {
    expect(Localisation.safe({ latitude, longitude })).toBeNull();
  });

  /**
   * Le jeu d'essai d'origine portait Lyon coordonnées inversées — `4.83 / 45.76` — et le test
   * affirmait que c'était valide. Les bornes du globe ne pouvaient pas s'en apercevoir.
   */
  it('refuse un couple qui ne devient valide qu’une fois échangé, et le dit', (): void => {
    const resultat = Localisation.schema.safeParse({ latitude: 4.8375548, longitude: 45.7665478 });

    expect(resultat.success).toBe(false);
    expect(resultat.error?.issues[0]?.message).toContain('inversées');
  });

  it('refuse un point hors de tout territoire français', (): void => {
    expect(Localisation.safe({ latitude: 52.52, longitude: 13.405 })).toBeNull();
  });

  it.each([
    ['La Réunion', -20.8823, 55.4504],
    ['Martinique', 14.6161, -61.0588],
    ['Guyane', 4.9224, -52.3135],
    ['Mayotte', -12.7806, 45.2278],
    ['Saint-Pierre-et-Miquelon', 46.7817, -56.1746],
    ['Nouvelle-Calédonie', -22.2758, 166.458]
  ])('accepte un point en %s', (_: string, latitude: number, longitude: number): void => {
    expect(Localisation({ latitude, longitude })).toStrictEqual({ latitude, longitude });
  });
});
