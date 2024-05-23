/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { Id, LieuMediationNumerique, Nom, Pivot, Services } from '../../../models';
import { SchemaLieuMediationNumerique } from '../schema-lieux-de-mediation-numerique';
import {
  accessibiliteIfAny,
  adresse,
  fraisAChargeIfAny,
  contactIfAny,
  horairesIfAny,
  labelsAutresIfAny,
  labelsNationauxIfAny,
  localisationIfAny,
  modalitesAccompagnementIfAny,
  presentationIfAny,
  priseRdvIfAny,
  publicsAccueillisIfAny,
  sourceIfAny,
  structureParenteIfAny,
  typologiesIfAny,
  itinerancesIfAny,
  servicesIfAny,
  modalitesAccessIfAny
} from './from-schema-lieux-de-mediation-numerique-fields';

const optionalFields = (schemaLieuMediationNumeriqueItem: SchemaLieuMediationNumerique): Partial<LieuMediationNumerique> => {
  const servicesFound: { services?: Services } = servicesIfAny(schemaLieuMediationNumeriqueItem.services);
  return {
    ...servicesFound,
    ...localisationIfAny(schemaLieuMediationNumeriqueItem.latitude, schemaLieuMediationNumeriqueItem.longitude),
    ...typologiesIfAny(schemaLieuMediationNumeriqueItem.typologie),
    ...contactIfAny(schemaLieuMediationNumeriqueItem),
    ...horairesIfAny(schemaLieuMediationNumeriqueItem.horaires),
    ...presentationIfAny(schemaLieuMediationNumeriqueItem),
    ...sourceIfAny(schemaLieuMediationNumeriqueItem.source),
    ...structureParenteIfAny(schemaLieuMediationNumeriqueItem.structure_parente),
    ...publicsAccueillisIfAny(schemaLieuMediationNumeriqueItem.publics_accueillis, servicesFound.services),
    ...fraisAChargeIfAny(schemaLieuMediationNumeriqueItem.frais_a_charge, servicesFound.services),
    ...itinerancesIfAny(schemaLieuMediationNumeriqueItem.itinerance, servicesFound.services),
    ...labelsNationauxIfAny(schemaLieuMediationNumeriqueItem.labels_nationaux),
    ...labelsAutresIfAny(schemaLieuMediationNumeriqueItem.labels_autres),
    ...modalitesAccompagnementIfAny(schemaLieuMediationNumeriqueItem.modalites_accompagnement, servicesFound.services),
    ...modalitesAccessIfAny(schemaLieuMediationNumeriqueItem.modalites_acces, servicesFound.services),
    ...accessibiliteIfAny(schemaLieuMediationNumeriqueItem.accessibilite),
    ...priseRdvIfAny(schemaLieuMediationNumeriqueItem.prise_rdv)
  };
};

export const fromSchemaLieuDeMediationNumerique = (
  schemaLieuMediationNumeriqueItem: SchemaLieuMediationNumerique
): LieuMediationNumerique => ({
  id: Id(schemaLieuMediationNumeriqueItem.id),
  pivot: Pivot(schemaLieuMediationNumeriqueItem.pivot),
  nom: Nom(schemaLieuMediationNumeriqueItem.nom),
  ...adresse(schemaLieuMediationNumeriqueItem),
  date_maj: new Date(schemaLieuMediationNumeriqueItem.date_maj),
  ...optionalFields(schemaLieuMediationNumeriqueItem)
});

export const fromSchemaLieuxDeMediationNumerique = (
  schemaLieuxMediationNumerique: SchemaLieuMediationNumerique[]
): LieuMediationNumerique[] => schemaLieuxMediationNumerique.map(fromSchemaLieuDeMediationNumerique);
