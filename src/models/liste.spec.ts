import { describe, it, expect } from 'vitest';
import { sansDoublons, triee } from './liste';

describe('sansDoublons', (): void => {
  it('retire les valeurs répétées en gardant la première place de chacune', (): void => {
    expect(sansDoublons(['b', 'a', 'b', 'c', 'a'])).toStrictEqual(['b', 'a', 'c']);
  });

  it('rend une liste vide inchangée', (): void => {
    expect(sansDoublons([])).toStrictEqual([]);
  });
});

describe('triee', (): void => {
  it('ordonne les valeurs', (): void => {
    expect(triee(['TIERS_LIEUX', 'ASSO', 'BIB'])).toStrictEqual(['ASSO', 'BIB', 'TIERS_LIEUX']);
  });

  it('place les lettres accentuées auprès de leur lettre de base, et non après le z', (): void => {
    expect(triee(['Femmes', 'Étudiants', 'Jeunes'])).toStrictEqual(['Étudiants', 'Femmes', 'Jeunes']);
  });

  it('ne modifie pas la liste reçue', (): void => {
    const valeurs: string[] = ['b', 'a'];

    triee(valeurs);

    expect(valeurs).toStrictEqual(['b', 'a']);
  });

  it('rend le même ordre quelles que soient les permutations de la même liste', (): void => {
    expect(triee(['c', 'a', 'b'])).toStrictEqual(triee(['b', 'c', 'a']));
  });
});
