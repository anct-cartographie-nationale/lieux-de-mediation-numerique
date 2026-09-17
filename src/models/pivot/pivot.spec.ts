import { describe, it, expect } from 'vitest';
import { Pivot } from './pivot';
import { PivotError } from './errors';

describe('pivot model', (): void => {
  it('should create a valide pivot using Siret id', (): void => {
    const pivot: Pivot = Pivot('43575434300018');

    expect(pivot).toBe('43575434300018');
  });

  it('should refuse a siret that fails its check digit', (): void => {
    expect((): void => {
      Pivot('12345678910111');
    }).toThrow(new PivotError('12345678910111'));
  });

  /** Le RNA est sorti de la modélisation : cinq lieux sur dix-huit mille en portaient un. */
  it('should refuse a RNA, which is no longer a pivot', (): void => {
    expect((): void => {
      Pivot('W9R2003255');
    }).toThrow(new PivotError('W9R2003255'));
  });

  it('should throw PivotError if pivot do no match required format', (): void => {
    expect((): void => {
      Pivot('42');
    }).toThrow(new PivotError('42'));
  });
});
