import { CleBan } from './cle-ban';
import { CleBanError } from './errors';

describe('cleBan model', (): void => {
  it('should create a valide cleBan', (): void => {
    const cleBan: CleBan = CleBan('13001_3079_00001');

    expect(cleBan).toBe('13001_3079_00001');
  });

  it('should throw CleBanError if cle ban do no match required format', (): void => {
    expect((): void => {
      CleBan('42');
    }).toThrow(new CleBanError('42'));
  });
});
