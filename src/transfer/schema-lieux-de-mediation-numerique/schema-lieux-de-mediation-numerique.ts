/* eslint-disable @typescript-eslint/naming-convention, camelcase */

export type SchemaLieuMediationNumeriqueGeneralFields = {
  id: string;
  nom: string;
  services?: string;
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
};

export type SchemaLieuMediationNumeriqueLocalisationFields = {
  latitude?: number;
  longitude?: number;
};

export type SchemaLieuMediationNumeriqueContactFields = {
  telephone?: string;
  courriels?: string;
  site_web?: string;
};

export type SchemaLieuMediationNumeriquePresentationFields = {
  presentation_resume?: string;
  presentation_detail?: string;
};

export type SchemaLieuMediationNumeriqueAccesFields = {
  publics_specifiquement_adresses?: string;
  prise_en_charge_specifique?: string;
  frais_a_charge?: string;
  modalites_acces?: string;
  modalites_accompagnement?: string;
  fiche_acces_libre?: string;
  itinerance?: string;
};

export type SchemaLieuMediationNumeriqueLabelsFields = {
  dispositif_programmes_nationaux?: string;
  formations_labels?: string;
  autres_formations_labels?: string;
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
