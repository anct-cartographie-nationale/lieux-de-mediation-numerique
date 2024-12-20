import { ModalitesAccompagnementError } from './errors';
import { Model } from '../model';

export enum ModaliteAccompagnement {
  EnAutonomie = 'En autonomie',
  AccompagnementIndividuel = 'Accompagnement individuel',
  DansUnAtelier = 'Dans un atelier collectif',
  ADistance = 'À distance'
}

export type ModalitesAccompagnement = Model<'ModalitesAccompagnement', ModaliteAccompagnement[]>;

export type ModaliteAccompagnementIndefinie = "modalité d'accompagnement indéfinie";

const firstInvalidModaliteAccompagnement = (modaliteAccompagnement: ModaliteAccompagnement): boolean =>
  !Object.values(ModaliteAccompagnement).includes(modaliteAccompagnement);

const throwModalitesAccompagnementError = (modaliteAccompagnement: ModaliteAccompagnement[]): ModalitesAccompagnement => {
  throw new ModalitesAccompagnementError(
    modaliteAccompagnement.find(firstInvalidModaliteAccompagnement) ?? "modalité d'accompagnement indéfinie"
  );
};

const isModalitesAccompagnement = (
  modalitesAccompagnement: ModaliteAccompagnement[]
): modalitesAccompagnement is ModalitesAccompagnement =>
  modalitesAccompagnement.find(firstInvalidModaliteAccompagnement) == null;

export const ModalitesAccompagnement = (modalitesAccompagnement: ModaliteAccompagnement[]): ModalitesAccompagnement => {
  const modalitesAccompagnementWithoutDuplicates: ModaliteAccompagnement[] = Array.from(new Set(modalitesAccompagnement));
  return isModalitesAccompagnement(modalitesAccompagnementWithoutDuplicates)
    ? modalitesAccompagnementWithoutDuplicates
    : throwModalitesAccompagnementError(modalitesAccompagnement);
};
