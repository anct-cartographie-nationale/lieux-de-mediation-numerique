/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { LieuMediationNumerique } from '../../models';
import {
  adresseFields,
  collecteFields,
  contactFields,
  disponibiliteFields,
  structureGeneralFields,
  labelsFields,
  localisationFields,
  presentationFields,
  SchemaStructureDataInclusionAdresseFields,
  SchemaStructureDataInclusionCollecteFields,
  SchemaStructureDataInclusionContactFields,
  SchemaStructureDataInclusionDisponibiliteFields,
  SchemaStructureDataInclusionStructureGeneralFields,
  SchemaStructureDataInclusionLabelsFields,
  SchemaStructureDataInclusionLocalisationFields,
  SchemaStructureDataInclusionPresentationFields,
  serviceGeneralFields,
  SchemaStructureDataInclusionServiceGeneralFields,
  SchemaStructureDataInclusionAccessFields,
  accessFields
} from './to-schema-data-inclusion-fields';

export type SchemaStructureDataInclusion = SchemaStructureDataInclusionAdresseFields &
  SchemaStructureDataInclusionCollecteFields &
  SchemaStructureDataInclusionContactFields &
  SchemaStructureDataInclusionDisponibiliteFields &
  SchemaStructureDataInclusionLabelsFields &
  SchemaStructureDataInclusionLocalisationFields &
  SchemaStructureDataInclusionPresentationFields &
  SchemaStructureDataInclusionStructureGeneralFields;

export type SchemaServiceDataInclusion = SchemaStructureDataInclusionAccessFields &
  SchemaStructureDataInclusionServiceGeneralFields;

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
