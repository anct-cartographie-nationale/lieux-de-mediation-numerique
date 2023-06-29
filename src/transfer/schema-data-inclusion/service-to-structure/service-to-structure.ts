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

const presentationFromService = (
  service: SchemaServiceDataInclusionWithAdresse
): SchemaStructureDataInclusionPresentationFields => ({
  ...(service.presentation_resume == null ? {} : { presentation_resume: service.presentation_resume }),
  ...(service.presentation_detail == null ? {} : { presentation_detail: service.presentation_detail })
});

const contactFromService = (service: SchemaServiceDataInclusionWithAdresse): SchemaStructureDataInclusionContactFields => ({
  ...(service.telephone == null ? {} : { telephone: service.telephone }),
  ...(service.courriel == null ? {} : { courriel: service.courriel })
});

const labelsFromStructure = (structure: SchemaStructureDataInclusion): SchemaStructureDataInclusionLabelsFields => ({
  ...(structure.labels_nationaux == null ? {} : { labels_nationaux: structure.labels_nationaux }),
  ...(structure.labels_autres == null ? {} : { labels_autres: structure.labels_autres })
});

const generalFieldsFromStructureAndService = (
  structure: SchemaStructureDataInclusion,
  service: SchemaServiceDataInclusionWithAdresse
): SchemaStructureDataInclusionStructureGeneralFields => ({
  id: service.id,
  nom: service.nom,
  ...(structure.siret == null ? {} : { siret: structure.siret }),
  ...(structure.typologie == null ? {} : { typologie: structure.typologie }),
  structure_parente: service.structure_id,
  ...(structure.accessibilite == null ? {} : { accessibilite: structure.accessibilite }),
  ...(structure.site_web == null ? {} : { site_web: structure.site_web })
});

const collecteFieldsFromStructureAndService = (
  structure: SchemaStructureDataInclusion,
  service: SchemaServiceDataInclusionWithAdresse
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
  ...generalFieldsFromStructureAndService(structure, service),
  ...collecteFieldsFromStructureAndService(structure, service),
  ...localisationFieldsFromService(service),
  ...adresseFromService(service),
  ...presentationFromService(service),
  ...contactFromService(service),
  ...labelsFromStructure(structure),
  ...(structure.horaires_ouverture == null ? {} : { horaires_ouverture: structure.horaires_ouverture })
});
