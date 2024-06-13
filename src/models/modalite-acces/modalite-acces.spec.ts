import { ModalitesAccesError } from './errors';
import { ModaliteAcces, ModalitesAcces } from './modalite-acces';

describe('modalite acces model', (): void => {
  it('should create valid modalites acces', (): void => {
    const modalitesAcces: ModalitesAcces = ModalitesAcces([ModaliteAcces.SePresenter]);

    expect(modalitesAcces).toStrictEqual([ModaliteAcces.SePresenter]);
  });

  it('should not create invalid modalites acces', (): void => {
    expect((): void => {
      ModalitesAcces(['Venir sur place' as ModaliteAcces]);
    }).toThrow(new ModalitesAccesError('Venir sur place' as ModaliteAcces));
  });

  it('should not create invalid modalite acces containing a valid and an invalid value', (): void => {
    expect((): void => {
      ModalitesAcces([ModaliteAcces.SePresenter, 'Venir sur place' as ModaliteAcces]);
    }).toThrow(new ModalitesAccesError('Venir sur place' as ModaliteAcces));
  });
});
