import { describe, expect, it } from 'vitest';
import { Siret } from './siret';

describe('siret model', (): void => {
  it('construit un siret valide', (): void => {
    const siret: Siret = Siret('43575434300018');

    expect(siret).toBe('43575434300018');
  });

  it('refuse un siret qui n’a pas la forme attendue', (): void => {
    expect(Siret.safe('42')).toBeNull();
  });

  it('retire les espaces avant de valider', (): void => {
    expect(Siret('435 754 343 00018')).toBe('43575434300018');
    expect(Siret.safe('842 887 408 00')).toBeNull();
  });

  it('refuse un siret dont la clé de contrôle est fausse', (): void => {
    expect(Siret.safe('12345678910111')).toBeNull();
  });

  it('refuse la sentinelle qui tenait lieu de siret absent', (): void => {
    expect(Siret.safe('00000000000000')).toBeNull();
  });

  /**
   * La Poste immatricule ses établissements sous des SIRET qui ne respectent pas la clé de
   * contrôle. Sans cette exemption, cent trente-neuf lieux du jeu national perdent leur pivot
   * au lieu de quatre.
   */
  it('accepte un siret de La Poste, qui ne respecte pas la clé de contrôle', (): void => {
    expect(Siret('35600000067271')).toBe('35600000067271');
  });

  it('refuse ce qui n’est pas quatorze chiffres', (): void => {
    expect(Siret.safe('W9R2003255')).toBeNull();
  });
});
