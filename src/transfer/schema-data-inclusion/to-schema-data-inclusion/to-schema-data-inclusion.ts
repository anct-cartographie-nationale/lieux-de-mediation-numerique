import { LieuMediationNumerique } from '../../../models';
import { SchemaServiceDataInclusion, SchemaStructureDataInclusion } from '../schema-data-inclusion';
import {
  adresseFields,
  collecteFields,
  contactFields,
  disponibiliteFields,
  structureGeneralFields,
  labelsFields,
  localisationFields,
  presentationFields,
  serviceGeneralFields,
  accesFields
} from './to-schema-data-inclusion-fields';

export const toSchemaStructureDataInclusion = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaStructureDataInclusion => ({
  ...structureGeneralFields(lieuMediationNumerique),
  ...adresseFields(lieuMediationNumerique),
  ...collecteFields(lieuMediationNumerique),
  ...localisationFields(lieuMediationNumerique),
  ...contactFields(lieuMediationNumerique),
  ...presentationFields(lieuMediationNumerique),
  ...disponibiliteFields(lieuMediationNumerique),
  ...labelsFields(lieuMediationNumerique)
});

export const toSchemaStructuresDataInclusion = (
  lieuxMediationNumerique: LieuMediationNumerique[]
): SchemaStructureDataInclusion[] => lieuxMediationNumerique.map(toSchemaStructureDataInclusion);

export const toSchemaServiceDataInclusion = (lieuMediationNumerique: LieuMediationNumerique): SchemaServiceDataInclusion => ({
  ...serviceGeneralFields(lieuMediationNumerique),
  ...accesFields(lieuMediationNumerique)
});

export const toSchemaServicesDataInclusion = (
  lieuxMediationNumerique: LieuMediationNumerique[]
): SchemaServiceDataInclusion[] => lieuxMediationNumerique.map(toSchemaServiceDataInclusion);
