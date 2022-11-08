import { LieuMediationNumerique } from '../../models';
import {
  adresseFields,
  collecteFields,
  contactFields,
  disponibiliteFields,
  generalFields,
  labelsFields,
  localisationFields,
  presentationFields,
  SchemaStructureDataInclusionAdresseFields,
  SchemaStructureDataInclusionCollecteFields,
  SchemaStructureDataInclusionContactFields,
  SchemaStructureDataInclusionDisponibiliteFields,
  SchemaStructureDataInclusionGeneralFields,
  SchemaStructureDataInclusionLabelsFields,
  SchemaStructureDataInclusionLocalisationFields,
  SchemaStructureDataInclusionPresentationFields
} from './to-schema-data-inclusion-fields';

export type SchemaStructureDataInclusion = SchemaStructureDataInclusionAdresseFields & SchemaStructureDataInclusionCollecteFields & SchemaStructureDataInclusionContactFields & SchemaStructureDataInclusionDisponibiliteFields & SchemaStructureDataInclusionGeneralFields & SchemaStructureDataInclusionLabelsFields & SchemaStructureDataInclusionLocalisationFields & SchemaStructureDataInclusionPresentationFields;

export const toSchemaStructureDataInclusion = (
  lieuxMediationNumerique: LieuMediationNumerique[]
): SchemaStructureDataInclusion[] =>
  lieuxMediationNumerique.map(
    (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusion => ({
      ...generalFields(lieuMediationNumerique),
      ...adresseFields(lieuMediationNumerique),
      ...collecteFields(lieuMediationNumerique),
      ...localisationFields(lieuMediationNumerique),
      ...contactFields(lieuMediationNumerique),
      ...presentationFields(lieuMediationNumerique),
      ...disponibiliteFields(lieuMediationNumerique),
      ...labelsFields(lieuMediationNumerique)
    })
  );
