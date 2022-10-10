/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { LieuMediationNumerique } from '../../models';
import {
  accessFields,
  adresseFields,
  collecteFields,
  contactFields,
  disponibiliteFields,
  generalFields,
  labelsFields,
  localisationFields,
  presentationFields,
  SchemaLieuMediationNumeriqueAccessFields,
  SchemaLieuMediationNumeriqueAdresseFields,
  SchemaLieuMediationNumeriqueCollecteFields,
  SchemaLieuMediationNumeriqueContactFields,
  SchemaLieuMediationNumeriqueDisponibiliteFields,
  SchemaLieuMediationNumeriqueGeneralFields,
  SchemaLieuMediationNumeriqueLabelsFields,
  SchemaLieuMediationNumeriqueLocalisationFields,
  SchemaLieuMediationNumeriquePresentationFields
} from './to-schema-lieux-de-mediation-numerique-fields';

export type SchemaLieuMediationNumerique = SchemaLieuMediationNumeriqueAccessFields &
  SchemaLieuMediationNumeriqueAdresseFields &
  SchemaLieuMediationNumeriqueCollecteFields &
  SchemaLieuMediationNumeriqueContactFields &
  SchemaLieuMediationNumeriqueDisponibiliteFields &
  SchemaLieuMediationNumeriqueGeneralFields &
  SchemaLieuMediationNumeriqueLabelsFields &
  SchemaLieuMediationNumeriqueLocalisationFields &
  SchemaLieuMediationNumeriquePresentationFields;

export const toSchemaLieuxDeMediationNumerique = (
  lieuxMediationNumerique: LieuMediationNumerique[]
): SchemaLieuMediationNumerique[] =>
  lieuxMediationNumerique.map(
    (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumerique => ({
      ...generalFields(lieuMediationNumerique),
      ...adresseFields(lieuMediationNumerique),
      ...localisationFields(lieuMediationNumerique),
      ...contactFields(lieuMediationNumerique),
      ...presentationFields(lieuMediationNumerique),
      ...accessFields(lieuMediationNumerique),
      ...labelsFields(lieuMediationNumerique),
      ...disponibiliteFields(lieuMediationNumerique),
      ...collecteFields(lieuMediationNumerique)
    })
  );
