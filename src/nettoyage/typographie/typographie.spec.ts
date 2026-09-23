import { describe, expect, it } from 'vitest';
import { appliquerRegle, appliquerRegles } from '../regle';
import { DEBUT_DE_FORMULE, GUILLEMETS_DROITS, REGLES_TYPOGRAPHIQUES } from './typographie';

describe('REGLES_TYPOGRAPHIQUES', (): void => {
  it('should compose an accent typed as a separate mark', (): void => {
    expect(appliquerRegles(REGLES_TYPOGRAPHIQUES, 'École')).toBe('École');
  });

  it('should drop invisible characters', (): void => {
    expect(appliquerRegles(REGLES_TYPOGRAPHIQUES, '﻿Bâti­ment​ B')).toBe('Bâtiment B');
  });

  it.each([['Rez‐de‐chaussée'], ['Rez‑de‑chaussée'], ['Rez‒de‒chaussée'], ['Rez−de−chaussée']])(
    'should bring the dashes of %s back to a hyphen',
    (valeur: string): void => {
      expect(appliquerRegles(REGLES_TYPOGRAPHIQUES, valeur)).toBe('Rez-de-chaussée');
    }
  );

  it('should keep the en and em dashes, which French typography uses', (): void => {
    expect(appliquerRegles(REGLES_TYPOGRAPHIQUES, 'Mairie – 1er étage — accueil')).toBe('Mairie – 1er étage — accueil');
  });

  it.each([['Place de l`Église'], ['Place de l´Église'], ['Place de lʼÉglise'], ['Place de l‘Église'], ['Place de l′Église']])(
    'should bring the apostrophe of %s back to a typographic one',
    (valeur: string): void => {
      expect(appliquerRegles(REGLES_TYPOGRAPHIQUES, valeur)).toBe('Place de l’Église');
    }
  );

  it('should read an ordinal indicator as the degree it stands for', (): void => {
    expect(appliquerRegles(REGLES_TYPOGRAPHIQUES, 'Salle nº 3')).toBe('Salle n° 3');
  });

  it('should read underscores as spaces', (): void => {
    expect(appliquerRegles(REGLES_TYPOGRAPHIQUES, 'Rue_de_la_Mairie')).toBe('Rue de la Mairie');
  });

  it('should repair a latin-1 reading of utf-8 bytes', (): void => {
    expect(appliquerRegles(REGLES_TYPOGRAPHIQUES, 'CafÃ©')).toBe('Café');
  });
});

describe('GUILLEMETS_DROITS', (): void => {
  it('should turn a pair of straight quotes into French quotes', (): void => {
    expect(appliquerRegle('Groupe scolaire "Les Terrasses"', GUILLEMETS_DROITS)).toBe('Groupe scolaire « Les Terrasses »');
  });

  it('should drop a straight quote left without a pair', (): void => {
    expect(appliquerRegle('Résidence "Les Pins', GUILLEMETS_DROITS)).toBe('Résidence Les Pins');
  });

  it('should drop an empty pair', (): void => {
    expect(appliquerRegle('Bâtiment "" B', GUILLEMETS_DROITS)).toBe('Bâtiment  B');
  });
});

describe('DEBUT_DE_FORMULE', (): void => {
  it.each([['- Bâtiment B'], ['@Bâtiment B'], ['=Bâtiment B'], ['+ Bâtiment B'], [' -Bâtiment B']])(
    'should drop the start of %s, which a spreadsheet would read as a formula',
    (valeur: string): void => {
      expect(appliquerRegle(valeur, DEBUT_DE_FORMULE)).toBe('Bâtiment B');
    }
  );

  it('should keep a hyphen or an at sign further on', (): void => {
    expect(appliquerRegle('CRE@VALLEE - Bâtiment B', DEBUT_DE_FORMULE)).toBe('CRE@VALLEE - Bâtiment B');
  });
});
