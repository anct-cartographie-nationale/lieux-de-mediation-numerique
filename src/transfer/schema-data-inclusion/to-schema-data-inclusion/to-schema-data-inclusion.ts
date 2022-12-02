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
  accessFields
} from './to-schema-data-inclusion-fields';

export const toSchemaStructuresDataInclusion = (
  lieuxMediationNumerique: LieuMediationNumerique[]
): SchemaStructureDataInclusion[] =>
  lieuxMediationNumerique.map(
    (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusion => ({
      ...structureGeneralFields(lieuMediationNumerique),
      ...adresseFields(lieuMediationNumerique),
      ...collecteFields(lieuMediationNumerique),
      ...localisationFields(lieuMediationNumerique),
      ...contactFields(lieuMediationNumerique),
      ...presentationFields(lieuMediationNumerique),
      ...disponibiliteFields(lieuMediationNumerique),
      ...labelsFields(lieuMediationNumerique)
    })
  );

export const toSchemaServicesDataInclusion = (
  lieuxMediationNumerique: LieuMediationNumerique[]
): SchemaServiceDataInclusion[] =>
  lieuxMediationNumerique.map(
    (lieuMediationNumerique: LieuMediationNumerique): SchemaServiceDataInclusion => ({
      ...serviceGeneralFields(lieuMediationNumerique),
      ...accessFields(lieuMediationNumerique)
    })
  );
