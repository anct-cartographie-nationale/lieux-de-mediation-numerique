import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

export enum ModaliteAcces {
  SePresenter = 'Se présenter',
  Telephoner = 'Téléphoner',
  ContacterParMail = 'Contacter par mail',
  PrescriptionParMail = 'Envoyer un mail avec une fiche de prescription',
  PrendreRdvEnLigne = 'Prendre un RDV en ligne',
  PasDePublic = "Ce lieu n'accueille pas de public"
}

/**
 * Les doublons tombent à la construction, et c'est le schéma qui les écarte : la mise en
 * forme survit ainsi à la composition, là où un traitement posé dans le constructeur serait
 * contourné dès que `.schema` est imbriqué ailleurs.
 */
export const ModalitesAcces = defineModel(z.array(z.enum(ModaliteAcces)).transform(sansDoublons).brand('ModalitesAcces'));

export type ModalitesAcces = Model.TypeOf<typeof ModalitesAcces>;

export const toAccessibleLieu = (modalitesAcces: ModaliteAcces): boolean => modalitesAcces !== ModaliteAcces.PasDePublic;
