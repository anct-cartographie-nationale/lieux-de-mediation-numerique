import { describe, expect, it } from 'vitest';
import { Id } from './id';

describe('id model', (): void => {
  it('construit un identifiant valide', (): void => {
    const id: Id = Id('4cf5az948azc4z4');

    expect(id).toBe('4cf5az948azc4z4');
  });

  it('refuse une valeur absente', (): void => {
    expect(Id.safe(null as unknown as string)).toBeNull();
  });

  it('refuse un identifiant vide', (): void => {
    expect(Id.safe('')).toBeNull();
  });

  it.each([['avec espace'], ['avec/barre'], ['avec?point-interrogation'], ['avec#diese']])(
    'refuse %s, qui ne survit pas à une URL',
    (id: string): void => {
      expect(Id.safe(id)).toBeNull();
    }
  );

  it.each([['Paris_12'], ['dora_7dd05681-606a-4e8d'], ['a.b~c-d']])('accepte %s', (id: string): void => {
    expect(Id(id)).toBe(id);
  });
});
