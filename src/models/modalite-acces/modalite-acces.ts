import { Model } from '../model';
import { ModalitesAccesError } from './errors';

export enum ModaliteAcces {
  SePresenter = 'Se présenter',
  Telephoner = 'Téléphoner',
  ContacterParMail = 'Contacter par mail',
  PrescriptionParMail = 'Envoyer un mail avec une fiche de prescription',
  PrendreRdvEnLigne = 'Prendre un RDV en ligne',
  PasDePublic = "Ce lieu n'accueille pas de public"
}

export type ModalitesAcces = Model<'ModalitesAcces', ModaliteAcces[]>;

export type ModalitesAccesIndefinie = "modalité d'accès indéfinie";

const firstInvalidModaliteAcces = (modaliteAcces: ModaliteAcces): boolean =>
  !Object.values(ModaliteAcces).includes(modaliteAcces);

const throwModalitesAccesError = (modalitesAcces: ModaliteAcces[]): ModalitesAcces => {
  throw new ModalitesAccesError(modalitesAcces.find(firstInvalidModaliteAcces) ?? "modalité d'accès indéfinie");
};

const isModalitesAcces = (modalitesAcces: ModaliteAcces[]): modalitesAcces is ModalitesAcces =>
  modalitesAcces.find(firstInvalidModaliteAcces) == null;

export const ModalitesAcces = (modalitesAcces: ModaliteAcces[]): ModalitesAcces =>
  isModalitesAcces(modalitesAcces) ? modalitesAcces : throwModalitesAccesError(modalitesAcces);

export const toAccessibleLieu = (modalitesAcces: ModaliteAcces): boolean => modalitesAcces !== ModaliteAcces.PasDePublic;
