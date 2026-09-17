import { describe, it, expect } from 'vitest';
import { nettoyerVoie } from './voie';

describe('nettoyerVoie', (): void => {
  it('should expand street type abbreviations, which the reference scores better', (): void => {
    expect(nettoyerVoie('12 Av de la Gare')).toBe('12 Avenue de la Gare');
    expect(nettoyerVoie('3 Bd Voltaire')).toBe('3 Boulevard Voltaire');
    expect(nettoyerVoie('1 Pl de la Liberte')).toBe('1 Place de la Liberte');
  });

  it('should expand an abbreviation whatever its case, and a trailing dot', (): void => {
    expect(nettoyerVoie('All des Roses')).toBe('Allée des Roses');
    expect(nettoyerVoie('ALL DES ROSES')).toBe('Allée DES ROSES');
    expect(nettoyerVoie('AV. de la Gare')).toBe('Avenue de la Gare');
  });

  it('should not mistake the start of a word for an abbreviation', (): void => {
    expect(nettoyerVoie('Allee des Roses')).toBe('Allee des Roses');
  });

  it('should join a bis, ter or quater suffix to its number', (): void => {
    expect(nettoyerVoie('1 bis rue des Ajoncs')).toBe('1bis rue des Ajoncs');
    expect(nettoyerVoie('12 TER avenue Foch')).toBe('12ter avenue Foch');
  });

  it('should drop a zero house number', (): void => {
    expect(nettoyerVoie('0 Rue de la Paix')).toBe('Rue de la Paix');
  });

  it('should drop a null prefix left by a serialisation', (): void => {
    expect(nettoyerVoie('null 12 avenue des Fleurs')).toBe('12 avenue des Fleurs');
  });

  it('should empty a voie that is only a postal code', (): void => {
    expect(nettoyerVoie('75001')).toBe('');
    expect(nettoyerVoie('75001 Paris')).toBe('');
  });

  it('should cut what follows a postal code', (): void => {
    expect(nettoyerVoie('12 rue de la Gare 75009 Paris')).toBe('12 rue de la Gare');
  });

  it('should drop forbidden characters', (): void => {
    expect(nettoyerVoie('12 rue "des" Marronniers')).toBe('12 rue des Marronniers');
  });

  /** Réécrit avec `TextDecoder` : `Buffer` n'existe pas dans un navigateur. */
  it('should repair a latin-1 reading of utf-8 bytes', (): void => {
    expect(nettoyerVoie('2 rue du Caf\u00c3\u00a9')).toBe('2 rue du Café');
  });

  it('should never throw', (): void => {
    expect(nettoyerVoie('')).toBe('');
  });

  /**
   * `LOT` est la seule abréviation que la table ne porte pas, et c'est mesuré : développée,
   * elle fait *perdre* du score BAN — −0,051 en tête d'adresse, −0,163 quand le mot appartient
   * au nom de la voie. Le référentiel garde `LOT` comme nom et paraît défalquer `Lotissement`
   * comme type.
   */
  it.each([['LOT Le Clos d Achille'], ['12 LOT des Mimosas'], ['16 Avenue du LOT']])(
    'should leave %s alone, the reference scoring it better abbreviated',
    (voie: string): void => {
      expect(nettoyerVoie(voie)).toBe(voie);
    }
  );
});
