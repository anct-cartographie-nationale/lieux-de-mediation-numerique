import { LieuMediationNumerique } from '../../../models';
import { SchemaLieuMediationNumerique } from '../schema-lieux-de-mediation-numerique';
import {
  accesFields,
  adresseFields,
  collecteFields,
  contactFields,
  disponibiliteFields,
  generalFields,
  labelsFields,
  localisationFields,
  presentationFields
} from './to-schema-lieux-de-mediation-numerique-fields';

export const toSchemaLieuMediationNumerique = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaLieuMediationNumerique => ({
  ...generalFields(lieuMediationNumerique),
  ...adresseFields(lieuMediationNumerique),
  ...localisationFields(lieuMediationNumerique),
  ...contactFields(lieuMediationNumerique),
  ...presentationFields(lieuMediationNumerique),
  ...accesFields(lieuMediationNumerique),
  ...labelsFields(lieuMediationNumerique),
  ...disponibiliteFields(lieuMediationNumerique),
  ...collecteFields(lieuMediationNumerique)
});

export const toSchemaLieuxDeMediationNumerique = (
  lieuxMediationNumerique: LieuMediationNumerique[]
): SchemaLieuMediationNumerique[] => lieuxMediationNumerique.map(toSchemaLieuMediationNumerique);
