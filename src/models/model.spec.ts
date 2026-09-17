import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { defineModel } from './model';

const Trigramme = defineModel(z.string().trim().length(3).brand('Trigramme'));
const Majuscules = defineModel(z.string().trim().toUpperCase().min(1).brand('Majuscules'));

describe('defineModel', (): void => {
  describe('forme partielle : le constructeur lève', (): void => {
    it('construit une valeur marquée à partir d’une entrée valide', (): void => {
      expect(Trigramme('abc')).toBe('abc');
    });

    it('lève sur une entrée invalide', (): void => {
      expect((): void => {
        Trigramme('troplong');
      }).toThrow();
    });

    it('met en forme par le schéma avant de valider', (): void => {
      expect(Majuscules(' abc ')).toBe('ABC');
    });
  });

  describe('forme totale : .safe rend null', (): void => {
    it('rend la valeur marquée sur une entrée valide', (): void => {
      expect(Trigramme.safe('abc')).toBe('abc');
    });

    it('rend null plutôt que de lever sur une entrée invalide', (): void => {
      expect(Trigramme.safe('troplong')).toBeNull();
    });

    it('ne lève jamais, même sur une entrée d’un autre type', (): void => {
      expect((): void => {
        Trigramme.safe(undefined as unknown as string);
      }).not.toThrow();
      expect(Trigramme.safe(undefined as unknown as string)).toBeNull();
    });

    it('met en forme par le schéma avant de valider', (): void => {
      expect(Majuscules.safe(' abc ')).toBe('ABC');
    });
  });

  describe('composition : un .schema imbriqué dans un autre modèle', (): void => {
    const Paire = defineModel(z.object({ gauche: Majuscules.schema, droite: Trigramme.schema }).brand('Paire'));

    it('met en forme les champs imbriqués comme le ferait leur constructeur', (): void => {
      expect(Paire({ gauche: ' abc ', droite: ' xyz ' })).toEqual({ gauche: 'ABC', droite: 'xyz' });
      expect(Paire({ gauche: ' abc ', droite: ' xyz ' }).gauche).toBe(Majuscules(' abc '));
    });

    it('rejette sur la validation d’un champ imbriqué', (): void => {
      expect(Paire.safe({ gauche: '', droite: 'xyz' })).toBeNull();
      expect(Paire.safe({ gauche: 'abc', droite: 'troplong' })).toBeNull();
    });
  });
});
