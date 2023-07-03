/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  SchemaServiceDataInclusion,
  SchemaServiceDataInclusionWithAdresse,
  SchemaStructureDataInclusion,
  SchemaStructureDataInclusionAdresseFields,
  SchemaStructureDataInclusionCollecteFields,
  SchemaStructureDataInclusionContactFields,
  SchemaStructureDataInclusionLabelsFields,
  SchemaStructureDataInclusionLocalisationFields,
  SchemaStructureDataInclusionPresentationFields,
  SchemaStructureDataInclusionStructureGeneralFields
} from '../schema-data-inclusion';
import { isValidCourriel, isValidTelephone } from '../../../models';

export const isServiceWithAdresse = (
  service: Partial<SchemaStructureDataInclusionAdresseFields> & SchemaServiceDataInclusion
): service is SchemaServiceDataInclusionWithAdresse =>
  service.adresse != null && service.commune != null && service.code_postal != null;

const adresseFromService = (service: SchemaServiceDataInclusionWithAdresse): SchemaStructureDataInclusionAdresseFields => ({
  commune: service.commune,
  code_postal: service.code_postal,
  adresse: service.adresse,
  ...(service.code_insee == null ? {} : { code_insee: service.code_insee }),
  ...(service.complement_adresse == null ? {} : { complement_adresse: service.complement_adresse })
});

const presentationFromStructure = (
  structure: SchemaStructureDataInclusion
): SchemaStructureDataInclusionPresentationFields => ({
  ...(structure.presentation_resume == null ? {} : { presentation_resume: structure.presentation_resume }),
  ...(structure.presentation_detail == null ? {} : { presentation_detail: structure.presentation_detail })
});

const contactFromServiceOrStructure = (
  service: SchemaServiceDataInclusionWithAdresse,
  structure: SchemaStructureDataInclusion
): SchemaStructureDataInclusionContactFields => ({
  ...(structure.telephone == null ? {} : { telephone: structure.telephone }),
  ...(structure.courriel == null ? {} : { courriel: structure.courriel }),
  ...(isValidTelephone(service.telephone ?? '') ? { telephone: service.telephone } : {}),
  ...(isValidCourriel(service.courriel ?? '') ? { courriel: service.courriel } : {})
});

const labelsFromStructure = (structure: SchemaStructureDataInclusion): SchemaStructureDataInclusionLabelsFields => ({
  ...(structure.labels_nationaux == null ? {} : { labels_nationaux: structure.labels_nationaux }),
  ...(structure.labels_autres == null ? {} : { labels_autres: structure.labels_autres })
});

const generalFieldsFromServiceAndStructure = (
  service: SchemaServiceDataInclusionWithAdresse,
  structure: SchemaStructureDataInclusion
): SchemaStructureDataInclusionStructureGeneralFields => ({
  id: service.id,
  nom: service.nom,
  ...(structure.siret == null ? {} : { siret: structure.siret }),
  ...(structure.typologie == null ? {} : { typologie: structure.typologie }),
  structure_parente: service.structure_id,
  ...(structure.accessibilite == null ? {} : { accessibilite: structure.accessibilite }),
  ...(structure.site_web == null ? {} : { site_web: structure.site_web })
});

const collecteFieldsFromServiceAndStructure = (
  service: SchemaServiceDataInclusionWithAdresse,
  structure: SchemaStructureDataInclusion
): SchemaStructureDataInclusionCollecteFields => ({
  date_maj: service.date_maj ?? structure.date_maj,
  source: service.source
});

const localisationFieldsFromService = (
  service: SchemaServiceDataInclusionWithAdresse
): SchemaStructureDataInclusionLocalisationFields => ({
  ...(service.latitude == null ? {} : { latitude: service.latitude }),
  ...(service.longitude == null ? {} : { longitude: service.longitude })
});

export const toStructureDataInclusion = (
  service: SchemaServiceDataInclusionWithAdresse,
  structure: SchemaStructureDataInclusion
): SchemaStructureDataInclusion => ({
  ...generalFieldsFromServiceAndStructure(service, structure),
  ...collecteFieldsFromServiceAndStructure(service, structure),
  ...localisationFieldsFromService(service),
  ...adresseFromService(service),
  ...presentationFromStructure(structure),
  ...contactFromServiceOrStructure(service, structure),
  ...labelsFromStructure(structure),
  ...(structure.horaires_ouverture == null ? {} : { horaires_ouverture: structure.horaires_ouverture })
});
