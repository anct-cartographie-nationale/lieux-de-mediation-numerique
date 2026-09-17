import { describe, it, expect } from 'vitest';
import { appliquerRegle, appliquerRegles, type RegleDeNettoyage } from './regle';

const enMajuscules: RegleDeNettoyage = {
  nom: 'en majuscules',
  selecteur: /[a-z]/u,
  corriger: (valeur: string): string => valeur.toUpperCase()
};

describe('appliquerRegle', (): void => {
  it('should apply the fix when the selector recognises the value', (): void => {
    expect(appliquerRegle('abc', enMajuscules)).toBe('ABC');
  });

  it('should leave the value untouched when the selector does not match', (): void => {
    expect(appliquerRegle('123', enMajuscules)).toBe('123');
  });

  it('should apply the fix when the selector does NOT match and negation is set', (): void => {
    const saufSiChiffre: RegleDeNettoyage = { ...enMajuscules, negation: true, selecteur: /\d/u };

    expect(appliquerRegle('abc', saufSiChiffre)).toBe('ABC');
    expect(appliquerRegle('a1c', saufSiChiffre)).toBe('a1c');
  });

  it('should stay stable across calls when the selector carries the global flag', (): void => {
    const global: RegleDeNettoyage = { ...enMajuscules, selecteur: /[a-z]/gu };

    expect(appliquerRegle('abc', global)).toBe('ABC');
    expect(appliquerRegle('abc', global)).toBe('ABC');
    expect(appliquerRegle('abc', global)).toBe('ABC');
  });

  it('should keep the case insensitive flag', (): void => {
    const insensible: RegleDeNettoyage = { ...enMajuscules, selecteur: /ABC/iu };

    expect(appliquerRegle('abc', insensible)).toBe('ABC');
  });
});

describe('appliquerRegles', (): void => {
  it('should chain rules, each working on the previous result', (): void => {
    const sansEspace: RegleDeNettoyage = {
      nom: 'sans espace',
      selecteur: /\s/u,
      corriger: (valeur: string): string => valeur.replace(/\s/gu, '')
    };

    expect(appliquerRegles([sansEspace, enMajuscules], 'a b c')).toBe('ABC');
  });

  it('should leave the value untouched when no rule matches', (): void => {
    expect(appliquerRegles([enMajuscules], '123')).toBe('123');
  });
});
