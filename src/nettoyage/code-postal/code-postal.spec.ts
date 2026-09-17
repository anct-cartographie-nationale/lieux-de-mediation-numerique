import { describe, it, expect } from 'vitest';
import { nettoyerCodePostal } from './code-postal';

describe('nettoyerCodePostal', (): void => {
  it('should restore a leading zero lost by a spreadsheet', (): void => {
    expect(nettoyerCodePostal('1000')).toBe('01000');
  });

  it('should leave a well formed code untouched', (): void => {
    expect(nettoyerCodePostal('75001')).toBe('75001');
    expect(nettoyerCodePostal('01000')).toBe('01000');
  });

  it('should drop the decimals a spreadsheet added', (): void => {
    expect(nettoyerCodePostal('75001.0')).toBe('75001');
  });

  /**
   * Comportement d'origine, conservé tel quel : la règle du zéro initial s'applique avant celle
   * des décimales, et `1000.0` ne ressemble pas à quatre chiffres. Le zéro n'est donc pas
   * restitué. Le déménagement préserve le comportement ; le corriger est une autre décision.
   */
  it('should not restore the leading zero when decimals hid it', (): void => {
    expect(nettoyerCodePostal('1000.0')).toBe('1000');
  });

  it('should never throw, whatever it is given', (): void => {
    expect(nettoyerCodePostal('')).toBe('');
    expect(nettoyerCodePostal('pas un code')).toBe('pas un code');
  });
});
