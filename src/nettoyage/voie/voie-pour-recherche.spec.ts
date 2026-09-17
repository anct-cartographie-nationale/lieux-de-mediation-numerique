import { describe, it, expect } from 'vitest';
import { nettoyerVoiePourRecherche } from './voie-pour-recherche';

describe('nettoyerVoiePourRecherche', (): void => {
  it('should keep only the first number of a range, which alone designates a point', (): void => {
    expect(nettoyerVoiePourRecherche('211-213 boulevard Vincent Auriol')).toBe('211 boulevard Vincent Auriol');
  });

  it('should drop a building detail between parentheses', (): void => {
    expect(nettoyerVoiePourRecherche('3 rue des Lilas (Bat B)')).toBe('3 rue des Lilas');
  });

  it('should keep a delegated commune between parentheses', (): void => {
    expect(nettoyerVoiePourRecherche('27 Rue Victor Hugo (Saint-Pol-sur-Mer)')).toBe('27 Rue Victor Hugo (Saint-Pol-sur-Mer)');
  });

  it('should drop a postal box, which the reference does not know', (): void => {
    expect(nettoyerVoiePourRecherche('8 rue de la Paix BP 42')).toBe('8 rue de la Paix');
  });

  it('should drop what precedes the street type', (): void => {
    expect(nettoyerVoiePourRecherche('IMMEUBLE ANTHYLLIS ZAC BASSO CAMBO 8 RUE PAUL MESPLE')).toBe('8 RUE PAUL MESPLE');
  });

  it('should keep a compound name that carries the street type', (): void => {
    expect(nettoyerVoiePourRecherche('Grand-Place')).toBe('Grand-Place');
  });

  it('should drop an isolated letter between the number and the street type', (): void => {
    expect(nettoyerVoiePourRecherche('46 b Avenue Joliot Curie')).toBe('46 Avenue Joliot Curie');
  });

  it('should keep a letter that abbreviates the street type itself', (): void => {
    expect(nettoyerVoiePourRecherche('372 R des Tovets')).toBe('372 R des Tovets');
  });

  it('should never throw', (): void => {
    expect(nettoyerVoiePourRecherche('')).toBe('');
  });
});
