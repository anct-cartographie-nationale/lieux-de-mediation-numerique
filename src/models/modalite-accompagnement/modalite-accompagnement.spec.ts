import { ModaliteAccompagnement, ModalitesAccompagnement } from './modalite-accompagnement';
import { ModalitesAccompagnementError } from './errors';

describe('modalite accompagnement model', (): void => {
  it('should create a valid modalite accompagnement', (): void => {
    const modalitesAccompagnement: ModalitesAccompagnement = ModalitesAccompagnement([ModaliteAccompagnement.AMaPlace]);

    expect(modalitesAccompagnement).toStrictEqual([ModaliteAccompagnement.AMaPlace]);
  });

  it('should not create invalid modalite accompagnement', (): void => {
    expect((): void => {
      ModalitesAccompagnement(['En autonomie' as ModaliteAccompagnement]);
    }).toThrow(new ModalitesAccompagnementError('En autonomie' as ModaliteAccompagnement));
  });

  it('should not create invalid modalite accompagnement containing a valid and an invalid value', (): void => {
    expect((): void => {
      ModalitesAccompagnement([ModaliteAccompagnement.AMaPlace, 'En autonomie' as ModaliteAccompagnement]);
    }).toThrow(new ModalitesAccompagnementError('En autonomie' as ModaliteAccompagnement));
  });
});
