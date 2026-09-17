import { describe, expect, it } from 'vitest';
import { Courriel, PARTIE_LOCALE_LONGUEUR_MAXIMALE } from './courriel';

describe('courriel model', (): void => {
  it('construit un courriel valide', (): void => {
    const courriel: Courriel = Courriel('test@gmail.com');

    expect(courriel).toBe('test@gmail.com');
  });

  it('refuse une adresse sans extension de domaine', (): void => {
    expect(Courriel.safe('test@gmail')).toBeNull();
  });

  it('refuse une adresse sans arobase', (): void => {
    expect(Courriel.safe('contact example.fr')).toBeNull();
  });

  it('accepte une partie locale d’un seul caractère, que le motif d’origine refusait', (): void => {
    expect(Courriel('a@exemple.fr')).toBe('a@exemple.fr');
  });

  it.each([['a..b@exemple.fr'], ['a.@exemple.fr'], ['.a@exemple.fr']])('refuse %s', (courriel: string): void => {
    expect(Courriel.safe(courriel)).toBeNull();
  });

  it('refuse une liste déguisée en une seule adresse', (): void => {
    expect(Courriel.safe('contact@mairie.fr;accueil@mairie.fr')).toBeNull();
  });

  it('refuse une partie locale trop longue pour la RFC 5321', (): void => {
    expect(Courriel.safe(`${'a'.repeat(PARTIE_LOCALE_LONGUEUR_MAXIMALE + 1)}@exemple.fr`)).toBeNull();
  });
});
