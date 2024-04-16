import { Ridet } from './ridet';
import { RidetError } from './errors';

describe('ridet model', (): void => {
  it('should create a valide ridet with 6 digits', (): void => {
    const ridet: Ridet = Ridet('100259');

    expect(ridet).toBe('100259');
  });

  it('should create a valide ridet with 7 digits', (): void => {
    const ridet: Ridet = Ridet('1008259');

    expect(ridet).toBe('1008259');
  });

  it('should throw RidetError if ridet do no match required format', (): void => {
    expect((): void => {
      Ridet('42');
    }).toThrow(new RidetError('42'));
  });

  it('should throw RidetError if ridet contains invalid chars', (): void => {
    expect((): void => {
      Ridet('842A887');
    }).toThrow(new RidetError('842A887'));
  });
});
