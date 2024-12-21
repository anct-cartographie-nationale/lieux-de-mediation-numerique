import { describe, it, expect } from 'vitest';
import { ModaliteAccompagnement, ModalitesAccompagnement } from './modalite-accompagnement';
import { ModalitesAccompagnementError } from './errors';

describe('modalite accompagnement model', (): void => {
  it('should create valid modalites accompagnement', (): void => {
    const modalitesAccompagnement: ModalitesAccompagnement = ModalitesAccompagnement([
      ModaliteAccompagnement.AccompagnementIndividuel
    ]);

    expect(modalitesAccompagnement).toStrictEqual([ModaliteAccompagnement.AccompagnementIndividuel]);
  });

  it('should not create invalid modalites accompagnement', (): void => {
    expect((): void => {
      ModalitesAccompagnement(['Délégation' as ModaliteAccompagnement]);
    }).toThrow(new ModalitesAccompagnementError('Délégation' as ModaliteAccompagnement));
  });

  it('should not create invalid modalite accompagnement containing a valid and an invalid value', (): void => {
    expect((): void => {
      ModalitesAccompagnement([ModaliteAccompagnement.AccompagnementIndividuel, 'Délégation' as ModaliteAccompagnement]);
    }).toThrow(new ModalitesAccompagnementError('Délégation' as ModaliteAccompagnement));
  });
});
