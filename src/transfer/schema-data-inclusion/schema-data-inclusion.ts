/* eslint-disable @typescript-eslint/naming-convention, camelcase */

export type SchemaStructureDataInclusionStructureGeneralFields = {
  id: string;
  nom: string;
  siret?: string;
  rna?: string;
  typologie?: string;
  structure_parente?: string;
  thematiques?: string[];
  accessibilite?: string;
};

export type SchemaStructureDataInclusionServiceGeneralFields = {
  id: string;
  structure_id: string;
  nom: string;
  prise_rdv?: string;
  thematiques?: string[];
  source: string;
  presentation_resume?: string;
};

export type SchemaStructureDataInclusionAdresseFields = {
  commune: string;
  code_postal: string;
  adresse: string;
  code_insee?: string;
  complement_adresse?: string;
};

export type SchemaStructureDataInclusionLocalisationFields = {
  latitude?: number;
  longitude?: number;
};

export type SchemaStructureDataInclusionContactFields = {
  telephone?: string;
  courriel?: string;
  site_web?: string;
};

export type SchemaStructureDataInclusionPresentationFields = {
  presentation_resume?: string;
  presentation_detail?: string;
};

export type SchemaStructureDataInclusionLabelsFields = {
  labels_nationaux?: string[];
  labels_autres?: string[];
};

export type SchemaStructureDataInclusionDisponibiliteFields = {
  horaires_ouverture?: string;
};

export type SchemaStructureDataInclusionCollecteFields = {
  date_maj: string;
  source?: string;
  lien_source?: string;
};

export type SchemaStructureDataInclusionAccesFields = {
  profils?: string[];
  frais?: string;
  types?: string[];
};

export type SchemaStructureDataInclusion = SchemaStructureDataInclusionAdresseFields &
  SchemaStructureDataInclusionCollecteFields &
  SchemaStructureDataInclusionContactFields &
  SchemaStructureDataInclusionDisponibiliteFields &
  SchemaStructureDataInclusionLabelsFields &
  SchemaStructureDataInclusionLocalisationFields &
  SchemaStructureDataInclusionPresentationFields &
  SchemaStructureDataInclusionStructureGeneralFields;

export type SchemaServiceDataInclusion = SchemaStructureDataInclusionAccesFields &
  SchemaStructureDataInclusionServiceGeneralFields;
