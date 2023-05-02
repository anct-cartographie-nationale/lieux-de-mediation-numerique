/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  SchemaServiceDataInclusion,
  SchemaServiceDataInclusionWithAdresse,
  SchemaStructureDataInclusion,
  SchemaStructureDataInclusionAdresseFields
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

export const toStructureDataInclusion = (
  service: SchemaServiceDataInclusionWithAdresse,
  structure: SchemaStructureDataInclusion
): SchemaStructureDataInclusion => ({
  id: service.id,
  nom: service.nom,
  ...adresseFromService(service),
  ...(service.latitude == null ? {} : { latitude: service.latitude }),
  ...(service.longitude == null ? {} : { longitude: service.longitude }),
  date_maj: service.date_maj ?? structure.date_maj,
  source: service.source,
  structure_parente: service.structure_id,
  ...(service.presentation_resume == null ? {} : { presentation_resume: service.presentation_resume }),
  ...(service.presentation_detail == null ? {} : { presentation_detail: service.presentation_detail }),
  ...(service.telephone == null ? {} : { telephone: service.telephone }),
  ...(service.courriel == null ? {} : { courriel: service.courriel })
});
