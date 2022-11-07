import { ModalitesAccompagnementError } from './errors';
import { Model } from '../model';

export enum ModaliteAccompagnement {
  AMaPlace = 'A ma place : une personne habilitée fait les démarches à ma place',
  AvecDeLAide = "Avec de l'aide : je suis accompagné seul dans l'usage du numérique",
  DansUnAtelier = "Dans un atelier : j'apprends collectivement à utiliser le numérique",
  Seul = "Seul : j'ai accès à du matériel et une connexion"
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

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const ModalitesAccompagnement = (modalitesAccompagnement: ModaliteAccompagnement[]): ModalitesAccompagnement =>
  isModalitesAccompagnement(modalitesAccompagnement)
    ? modalitesAccompagnement
    : throwModalitesAccompagnementError(modalitesAccompagnement);
