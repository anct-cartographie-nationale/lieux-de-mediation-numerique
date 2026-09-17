import { describe, it, expect } from 'vitest';
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

  /** L'identifiant sert de clé et voyage dans des URL. */
  it.each([['avec espace'], ['avec/barre'], ['avec?point-interrogation'], ['avec#diese']])(
    'should refuse %s, which does not survive a URL',
    (id: string): void => {
      expect((): void => {
        Id(id);
      }).toThrow(new IdError(id));
    }
  );

  it.each([['Paris_12'], ['dora_7dd05681-606a-4e8d'], ['a.b~c-d']])('should accept %s', (id: string): void => {
    expect(Id(id)).toBe(id);
  });
});
