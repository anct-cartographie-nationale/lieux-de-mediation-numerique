import { describe, expect, it } from 'vitest';
import { ModaliteAccompagnement, ModalitesAccompagnement } from './modalite-accompagnement';

describe('modalite accompagnement model', (): void => {
  it('should create valid modalites accompagnement', (): void => {
    const modalitesAccompagnement: ModalitesAccompagnement = ModalitesAccompagnement([
      ModaliteAccompagnement.AccompagnementIndividuel
    ]);

    expect(modalitesAccompagnement).toStrictEqual([ModaliteAccompagnement.AccompagnementIndividuel]);
  });

  it('should not create invalid modalites accompagnement', (): void => {
    expect(ModalitesAccompagnement.safe(['Délégation' as ModaliteAccompagnement])).toBeNull();
  });

  it('should not create invalid modalite accompagnement containing a valid and an invalid value', (): void => {
    expect(
      ModalitesAccompagnement.safe([ModaliteAccompagnement.AccompagnementIndividuel, 'Délégation' as ModaliteAccompagnement])
    ).toBeNull();
  });
});
