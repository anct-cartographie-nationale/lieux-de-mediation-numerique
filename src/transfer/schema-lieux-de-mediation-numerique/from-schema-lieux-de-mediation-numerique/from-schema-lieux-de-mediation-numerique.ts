/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { Id, LieuMediationNumerique, Nom, Pivot, Services } from '../../../models';
import { SchemaLieuMediationNumerique } from '../schema-lieux-de-mediation-numerique';
import {
  accessibiliteIfAny,
  adresse,
  cleBanIfAny,
  conditionsAccesIfAny,
  contactIfAny,
  horairesIfAny,
  labelsAutresIfAny,
  labelsNationauxIfAny,
  listFromString,
  localisationIfAny,
  modalitesAccesIfAny,
  modalitesAccompagnementIfAny,
  presentationIfAny,
  priseRdvIfAny,
  publicsAccueillisIfAny,
  sourceIfAny,
  structureParenteIfAny,
  typologiesIfAny
} from './from-schema-lieux-de-mediation-numerique-fields';

const optionalFields = (schemaLieuMediationNumeriqueItem: SchemaLieuMediationNumerique): Partial<LieuMediationNumerique> => ({
  ...localisationIfAny(schemaLieuMediationNumeriqueItem.latitude, schemaLieuMediationNumeriqueItem.longitude),
  ...cleBanIfAny(schemaLieuMediationNumeriqueItem.cle_ban),
  ...typologiesIfAny(schemaLieuMediationNumeriqueItem.typologie),
  ...contactIfAny(schemaLieuMediationNumeriqueItem),
  ...horairesIfAny(schemaLieuMediationNumeriqueItem.horaires),
  ...presentationIfAny(schemaLieuMediationNumeriqueItem),
  ...sourceIfAny(schemaLieuMediationNumeriqueItem.source),
  ...structureParenteIfAny(schemaLieuMediationNumeriqueItem.structure_parente),
  ...publicsAccueillisIfAny(schemaLieuMediationNumeriqueItem.publics_accueillis),
  ...conditionsAccesIfAny(schemaLieuMediationNumeriqueItem.conditions_acces),
  ...modalitesAccesIfAny(schemaLieuMediationNumeriqueItem.modalites_acces),
  ...labelsNationauxIfAny(schemaLieuMediationNumeriqueItem.labels_nationaux),
  ...labelsAutresIfAny(schemaLieuMediationNumeriqueItem.labels_autres),
  ...modalitesAccompagnementIfAny(schemaLieuMediationNumeriqueItem.modalites_accompagnement),
  ...accessibiliteIfAny(schemaLieuMediationNumeriqueItem.accessibilite),
  ...priseRdvIfAny(schemaLieuMediationNumeriqueItem.prise_rdv)
});

export const fromSchemaLieuDeMediationNumerique = (
  schemaLieuMediationNumeriqueItem: SchemaLieuMediationNumerique
): LieuMediationNumerique => ({
  id: Id(schemaLieuMediationNumeriqueItem.id),
  pivot: Pivot(schemaLieuMediationNumeriqueItem.pivot),
  nom: Nom(schemaLieuMediationNumeriqueItem.nom),
  ...adresse(schemaLieuMediationNumeriqueItem),
  services: Services(listFromString(schemaLieuMediationNumeriqueItem.services)),
  date_maj: new Date(schemaLieuMediationNumeriqueItem.date_maj),
  ...optionalFields(schemaLieuMediationNumeriqueItem)
});

export const fromSchemaLieuxDeMediationNumerique = (
  schemaLieuxMediationNumerique: SchemaLieuMediationNumerique[]
): LieuMediationNumerique[] => schemaLieuxMediationNumerique.map(fromSchemaLieuDeMediationNumerique);
