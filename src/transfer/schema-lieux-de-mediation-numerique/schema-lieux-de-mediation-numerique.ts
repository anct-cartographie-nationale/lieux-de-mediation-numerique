/* eslint-disable @typescript-eslint/naming-convention, camelcase */

export type SchemaLieuMediationNumeriqueGeneralFields = {
  id: string;
  nom: string;
  services: string;
  pivot: string;
  typologie?: string;
  structure_parente?: string;
};

export type SchemaLieuMediationNumeriqueAdresseFields = {
  commune: string;
  code_postal: string;
  adresse: string;
  code_insee?: string;
  complement_adresse?: string;
  cle_ban?: string;
};

export type SchemaLieuMediationNumeriqueLocalisationFields = {
  latitude: number;
  longitude: number;
};

export type SchemaLieuMediationNumeriqueContactFields = {
  telephone?: string;
  courriel?: string;
  site_web?: string;
};

export type SchemaLieuMediationNumeriquePresentationFields = {
  presentation_resume?: string;
  presentation_detail?: string;
};

export type SchemaLieuMediationNumeriqueAccesFields = {
  publics_accueillis?: string;
  conditions_acces?: string;
  modalites_accompagnement?: string;
  accessibilite?: string;
};

export type SchemaLieuMediationNumeriqueLabelsFields = {
  labels_nationaux?: string;
  labels_autres?: string;
};

export type SchemaLieuMediationNumeriqueDisponibiliteFields = {
  horaires?: string;
  prise_rdv?: string;
};

export type SchemaLieuMediationNumeriqueCollecteFields = {
  date_maj: string;
  source?: string;
};

export type SchemaLieuMediationNumerique = SchemaLieuMediationNumeriqueAccesFields &
  SchemaLieuMediationNumeriqueAdresseFields &
  SchemaLieuMediationNumeriqueCollecteFields &
  SchemaLieuMediationNumeriqueContactFields &
  SchemaLieuMediationNumeriqueDisponibiliteFields &
  SchemaLieuMediationNumeriqueGeneralFields &
  SchemaLieuMediationNumeriqueLabelsFields &
  SchemaLieuMediationNumeriqueLocalisationFields &
  SchemaLieuMediationNumeriquePresentationFields;
