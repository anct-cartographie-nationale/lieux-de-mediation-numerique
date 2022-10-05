import { Pivot, PivotError } from './pivot';

describe('pivot model', (): void => {
  it('should create a valide pivot using Siret id', (): void => {
    const pivot: Pivot = Pivot('12345678910111');

    expect(pivot).toBe('12345678910111');
  });

  it('should create a valide pivot using RNA id', (): void => {
    const pivot: Pivot = Pivot('W9R2003255');

    expect(pivot).toBe('W9R2003255');
  });

  it('should throw PivotError if pivot do no match required format', (): void => {
    expect((): void => {
      Pivot('42');
    }).toThrow(new PivotError('42'));
  });
});
