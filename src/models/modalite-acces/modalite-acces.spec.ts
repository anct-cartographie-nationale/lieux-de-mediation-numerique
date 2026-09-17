import { describe, expect, it } from 'vitest';
import { ModaliteAcces, ModalitesAcces } from './modalite-acces';

describe('modalite acces model', (): void => {
  it('should create valid modalites acces', (): void => {
    const modalitesAcces: ModalitesAcces = ModalitesAcces([ModaliteAcces.SePresenter]);

    expect(modalitesAcces).toStrictEqual([ModaliteAcces.SePresenter]);
  });

  it('should not create invalid modalites acces', (): void => {
    expect(ModalitesAcces.safe(['Venir sur place' as ModaliteAcces])).toBeNull();
  });

  it('should not create invalid modalite acces containing a valid and an invalid value', (): void => {
    expect(ModalitesAcces.safe([ModaliteAcces.SePresenter, 'Venir sur place' as ModaliteAcces])).toBeNull();
  });
});
