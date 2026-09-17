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

  it.each([['avec espace'], ['avec?point-interrogation'], ['avec#diese'], ['avec&esperluette'], ['avec%pourcent']])(
    'refuse %s, qui ne survit pas à une URL',
    (id: string): void => {
      expect(Id.safe(id)).toBeNull();
    }
  );

  it.each([['.'], ['..'], ['-'], ['~'], ['/']])('refuse %s, qui ne porte aucune lettre ni chiffre', (id: string): void => {
    expect(Id.safe(id)).toBeNull();
  });

  it.each([['Paris_12'], ['dora_7dd05681-606a-4e8d'], ['a.b~c-d']])('accepte %s', (id: string): void => {
    expect(Id(id)).toBe(id);
  });

  it.each([
    ['Conseil-départemental-des-Vosges_e42243b2-738e'],
    ['Hérault_12'],
    ['fredo_fredo-fredo--97407_13185-activités-/-ateliers']
  ])('accepte %s, qui circule dans les jeux publiés', (id: string): void => {
    expect(Id(id)).toBe(id);
  });
});
