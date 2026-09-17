import { describe, it, expect } from 'vitest';
import { nettoyerPresentation } from './presentation';

describe('nettoyerPresentation', (): void => {
  it('should drop html tags', (): void => {
    expect(nettoyerPresentation('<br>APOR vous souhaite la bienvenue')).toBe('APOR vous souhaite la bienvenue');
    expect(nettoyerPresentation('un <strong>lieu</strong> ouvert')).toBe('un lieu ouvert');
  });

  it('should resolve html entities', (): void => {
    expect(nettoyerPresentation('accueil &amp; accompagnement')).toBe('accueil & accompagnement');
    expect(nettoyerPresentation('caf&#233;')).toBe('café');
  });

  it('should leave a plain text untouched', (): void => {
    expect(nettoyerPresentation('Un lieu ouvert à tous')).toBe('Un lieu ouvert à tous');
  });

  it('should never throw', (): void => {
    expect(nettoyerPresentation('')).toBe('');
  });
});
