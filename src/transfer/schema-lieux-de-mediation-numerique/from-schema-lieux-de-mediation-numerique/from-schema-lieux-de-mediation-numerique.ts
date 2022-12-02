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
  modalitesAccompagnementIfAny,
  presentationIfAny,
  priseRdvIfAny,
  publicsAccueillisIfAny,
  sourceIfAny,
  structureParenteIfAny,
  typologiesIfAny
} from './from-schema-lieux-de-mediation-numerique-fields';

const toLieuMediationNumerique = (schemaLieuMediationNumeriqueItem: SchemaLieuMediationNumerique): LieuMediationNumerique => ({
  id: Id(schemaLieuMediationNumeriqueItem.id),
  pivot: Pivot(schemaLieuMediationNumeriqueItem.pivot),
  ...localisationIfAny(schemaLieuMediationNumeriqueItem.latitude, schemaLieuMediationNumeriqueItem.longitude),
  ...cleBanIfAny(schemaLieuMediationNumeriqueItem.cle_ban),
  nom: Nom(schemaLieuMediationNumeriqueItem.nom),
  ...adresse(schemaLieuMediationNumeriqueItem),
  services: Services(listFromString(schemaLieuMediationNumeriqueItem.services)),
  date_maj: new Date(schemaLieuMediationNumeriqueItem.date_maj),
  ...typologiesIfAny(schemaLieuMediationNumeriqueItem.typologie),
  ...contactIfAny(schemaLieuMediationNumeriqueItem),
  ...horairesIfAny(schemaLieuMediationNumeriqueItem.horaires),
  ...presentationIfAny(schemaLieuMediationNumeriqueItem),
  ...sourceIfAny(schemaLieuMediationNumeriqueItem.source),
  ...structureParenteIfAny(schemaLieuMediationNumeriqueItem.structure_parente),
  ...publicsAccueillisIfAny(schemaLieuMediationNumeriqueItem.publics_accueillis),
  ...conditionsAccesIfAny(schemaLieuMediationNumeriqueItem.conditions_acces),
  ...labelsNationauxIfAny(schemaLieuMediationNumeriqueItem.labels_nationaux),
  ...labelsAutresIfAny(schemaLieuMediationNumeriqueItem.labels_autres),
  ...modalitesAccompagnementIfAny(schemaLieuMediationNumeriqueItem.modalites_accompagnement),
  ...accessibiliteIfAny(schemaLieuMediationNumeriqueItem.accessibilite),
  ...priseRdvIfAny(schemaLieuMediationNumeriqueItem.prise_rdv)
});

export const fromSchemaLieuxDeMediationNumerique = (
  schemaLieuxMediationNumerique: SchemaLieuMediationNumerique[]
): LieuMediationNumerique[] => schemaLieuxMediationNumerique.map(toLieuMediationNumerique);
