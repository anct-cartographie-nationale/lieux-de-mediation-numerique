import { describe, it, expect } from 'vitest';
import { Siret } from './siret';
import { SiretError } from './errors';

describe('siret model', (): void => {
  it('should create a valide siret', (): void => {
    const siret: Siret = Siret('43575434300018');

    expect(siret).toBe('43575434300018');
  });

  it('should throw SiretError if siret do no match required format', (): void => {
    expect((): void => {
      Siret('42');
    }).toThrow(new SiretError('42'));
  });

  it('should throw SiretError if siret contains spaces', (): void => {
    expect((): void => {
      Siret('842 887 408 00');
    }).toThrow(new SiretError('84288740800'));
  });

  it('should refuse a siret that fails its check digit', (): void => {
    expect((): void => {
      Siret('12345678910111');
    }).toThrow(new SiretError('12345678910111'));
  });

  it('should refuse the sentinel that used to stand for a missing siret', (): void => {
    expect((): void => {
      Siret('00000000000000');
    }).toThrow(new SiretError('00000000000000'));
  });

  /**
   * La Poste immatricule ses établissements sous des SIRET qui ne respectent pas la clé de
   * contrôle. Sans cette exemption, cent trente-neuf lieux du jeu national perdent leur pivot
   * au lieu de quatre.
   */
  it('should accept a La Poste siret, which does not respect the check digit', (): void => {
    expect(Siret('35600000067271')).toBe('35600000067271');
  });

  it('should refuse anything that is not fourteen digits', (): void => {
    expect((): void => {
      Siret('W9R2003255');
    }).toThrow(new SiretError('W9R2003255'));
  });
});
