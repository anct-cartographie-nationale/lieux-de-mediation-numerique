import { describe, expect, it } from 'vitest';
import { ComplementAdresse } from '../../models';
import { nettoyerComplementAdresse } from './complement-adresse';

describe('nettoyerComplementAdresse', (): void => {
  it.each([['06 02 16 12 33'], ['77250'], ['21850033800015'], ['   '], ['-']])(
    'should empty %s, which is neither a text nor a number',
    (complement: string): void => {
      expect(nettoyerComplementAdresse(complement)).toBe('');
    }
  );

  it.each([['5'], ['163'], [' 1034 ']])('should keep %s, a plain number', (complement: string): void => {
    expect(nettoyerComplementAdresse(complement)).toBe(complement.trim());
  });

  it('should turn straight quotes into French quotes', (): void => {
    expect(nettoyerComplementAdresse('Groupe scolaire "Les Terrasses"')).toBe('Groupe scolaire « Les Terrasses »');
  });

  it('should drop the start a spreadsheet would read as a formula', (): void => {
    expect(nettoyerComplementAdresse('- 2ème étage')).toBe('2ème étage');
  });

  it('should join lines and squeeze spaces', (): void => {
    expect(nettoyerComplementAdresse(' Maison des Associations\n2ème   étage ')).toBe('Maison des Associations 2ème étage');
  });

  it.each([
    ['Marché des Halles ‒ 1er étage'],
    ['Groupe scolaire "Les Terrasses"'],
    ['Centre culturel Le MI[X]'],
    ['- Bâtiment_B'],
    ['Salle nº 3'],
    ['5']
  ])('should make %s valid', (complement: string): void => {
    expect(ComplementAdresse.safe(nettoyerComplementAdresse(complement))).not.toBeNull();
  });

  it('should replace every escaped line break', (): void => {
    expect(nettoyerComplementAdresse('Bât A\\nEsc B\\nEtage 2')).toBe('Bât A Esc B Etage 2');
  });

  it('should never throw', (): void => {
    expect(nettoyerComplementAdresse('')).toBe('');
  });

  it.each([
    ['Groupe scolaire "Les Terrasses"'],
    ['Résidence " Les Pins "  Bât A'],
    ['"Le Forum" puis "La Halle"'],
    ['Bât A\\nEsc B\\nEtage 2'],
    ['Résidence « Les Pins »'],
    ['- Bâtiment_B']
  ])('should be idempotent on %j', (complement: string): void => {
    const nettoye: string = nettoyerComplementAdresse(complement);

    expect(nettoyerComplementAdresse(nettoye)).toBe(nettoye);
  });
});
