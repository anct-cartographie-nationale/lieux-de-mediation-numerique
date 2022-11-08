/* eslint-disable @typescript-eslint/naming-convention, camelcase */

export type SchemaStructureDataInclusionGeneralFields = {
  id: string;
  nom: string;
  siret: string;
  typologie?: string;
  structure_parente?: string;
  thematiques?: ['numérique'];
  accessibilite?: string;
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

import { LieuMediationNumerique } from '../../models';

export const generalFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionGeneralFields => ({
  id: lieuMediationNumerique.id,
  nom: lieuMediationNumerique.nom,
  siret: lieuMediationNumerique.pivot,
  ...(lieuMediationNumerique.typologies != null && lieuMediationNumerique.typologies.length > 0
    ? { typologie: lieuMediationNumerique.typologies[0]?.toString() ?? '' }
    : {}),
  ...(lieuMediationNumerique.structure_parente == null ? {} : { structure_parente: lieuMediationNumerique.structure_parente }),
  ...(lieuMediationNumerique.accessibilite == null ? {} : { accessibilite: lieuMediationNumerique.accessibilite }),
  thematiques: ['numérique']
});

export const adresseFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionAdresseFields => ({
  commune: lieuMediationNumerique.adresse.commune,
  code_postal: lieuMediationNumerique.adresse.code_postal,
  adresse: lieuMediationNumerique.adresse.voie,
  ...(lieuMediationNumerique.adresse.code_insee == null ? {} : { code_insee: lieuMediationNumerique.adresse.code_insee }),
  ...(lieuMediationNumerique.adresse.complement_adresse == null
    ? {}
    : { complement_adresse: lieuMediationNumerique.adresse.complement_adresse })
});

export const localisationFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaStructureDataInclusionLocalisationFields => ({
  ...(lieuMediationNumerique.localisation?.latitude == null ? {} : { latitude: lieuMediationNumerique.localisation.latitude }),
  ...(lieuMediationNumerique.localisation?.longitude == null
    ? {}
    : { longitude: lieuMediationNumerique.localisation.longitude })
});

export const contactFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionContactFields => ({
  ...(lieuMediationNumerique.contact?.telephone == null ? {} : { telephone: lieuMediationNumerique.contact.telephone }),
  ...(lieuMediationNumerique.contact?.courriel == null ? {} : { courriel: lieuMediationNumerique.contact.courriel }),
  ...(lieuMediationNumerique.contact?.site_web != null && lieuMediationNumerique.contact.site_web.length > 0
    ? { site_web: lieuMediationNumerique.contact.site_web[0]?.toString() ?? '' }
    : {})
});

export const presentationFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaStructureDataInclusionPresentationFields => ({
  ...(lieuMediationNumerique.presentation?.resumee == null
    ? {}
    : { presentation_resume: lieuMediationNumerique.presentation.resumee }),
  ...(lieuMediationNumerique.presentation?.detail == null
    ? {}
    : { presentation_detail: lieuMediationNumerique.presentation.detail })
});

export const labelsFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionLabelsFields => ({
  ...(lieuMediationNumerique.labels_nationaux == null ? {} : { labels_nationaux: lieuMediationNumerique.labels_nationaux }),
  ...(lieuMediationNumerique.labels_autres == null ? {} : { labels_autres: lieuMediationNumerique.labels_autres })
});

export const disponibiliteFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaStructureDataInclusionDisponibiliteFields => ({
  ...(lieuMediationNumerique.horaires == null ? {} : { horaires_ouverture: lieuMediationNumerique.horaires })
});

export const collecteFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionCollecteFields => ({
  ...(lieuMediationNumerique.source == null ? {} : { source: lieuMediationNumerique.source }),
  date_maj: new Date(lieuMediationNumerique.date_maj).toISOString()
});
