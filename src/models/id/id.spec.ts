import { Id, IdToValidate } from './id';
import { IdError } from './errors';

describe('id model', (): void => {
  it('should create a valid id', (): void => {
    const idData: IdToValidate = '4cf5az948azc4z4';

    const id: Id = Id(idData);

    expect(id).toBe('4cf5az948azc4z4');
  });

  it('should throw IdError when id is null', (): void => {
    const idData: IdToValidate = null as unknown as string;

    expect((): void => {
      Id(idData);
    }).toThrow(new IdError(idData));
  });

  it('should throw IdError when id is empty string', (): void => {
    const idData: IdToValidate = '';

    expect((): void => {
      Id(idData);
    }).toThrow(new IdError(idData));
  });
});
