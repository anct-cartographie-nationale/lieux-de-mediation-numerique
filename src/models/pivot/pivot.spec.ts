import { describe, expect, it } from 'vitest';
import { Pivot } from './pivot';

describe('pivot model', (): void => {
  it('construit un pivot à partir d’un siret', (): void => {
    const pivot: Pivot = Pivot('43575434300018');

    expect(pivot).toBe('43575434300018');
  });

  it('refuse un siret dont la clé de contrôle est fausse', (): void => {
    expect(Pivot.safe('12345678910111')).toBeNull();
  });

  it('refuse un RNA, qui n’est plus un pivot', (): void => {
    expect(Pivot.safe('W9R2003255')).toBeNull();
  });

  it('refuse ce qui n’a pas la forme d’un siret', (): void => {
    expect(Pivot.safe('42')).toBeNull();
  });
});
