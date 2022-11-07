/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { LieuMediationNumerique } from '../../models';

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
  latitude?: number;
  longitude?: number;
};

export type SchemaLieuMediationNumeriqueContactFields = {
  telephone?: string;
  courriel?: string;
  site_web?: string;
};

export type SchemaLieuMediationNumeriquePresentationFields = {
  presentation_resumee?: string;
  presentation_detail?: string;
};

export type SchemaLieuMediationNumeriqueAccessFields = {
  publics_accueillis?: string;
  conditions_access?: string;
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

export const generalFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueGeneralFields => ({
  id: lieuMediationNumerique.id,
  nom: lieuMediationNumerique.nom,
  services: lieuMediationNumerique.services.join(';'),
  pivot: lieuMediationNumerique.pivot,
  ...(lieuMediationNumerique.typologie == null ? {} : { typologie: lieuMediationNumerique.typologie.join(';') }),
  ...(lieuMediationNumerique.structure_parente == null ? {} : { structure_parente: lieuMediationNumerique.structure_parente })
});

export const adresseFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueAdresseFields => ({
  commune: lieuMediationNumerique.adresse.commune,
  code_postal: lieuMediationNumerique.adresse.code_postal,
  adresse: lieuMediationNumerique.adresse.voie,
  ...(lieuMediationNumerique.adresse.code_insee == null ? {} : { code_insee: lieuMediationNumerique.adresse.code_insee }),
  ...(lieuMediationNumerique.adresse.complement_adresse == null
    ? {}
    : { complement_adresse: lieuMediationNumerique.adresse.complement_adresse }),
  ...(lieuMediationNumerique.cle_ban == null ? {} : { cle_ban: lieuMediationNumerique.cle_ban })
});

export const localisationFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaLieuMediationNumeriqueLocalisationFields => ({
  ...(lieuMediationNumerique.localisation?.latitude == null ? {} : { latitude: lieuMediationNumerique.localisation.latitude }),
  ...(lieuMediationNumerique.localisation?.longitude == null
    ? {}
    : { longitude: lieuMediationNumerique.localisation.longitude })
});

export const contactFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueContactFields => ({
  ...(lieuMediationNumerique.contact?.telephone == null ? {} : { telephone: lieuMediationNumerique.contact.telephone }),
  ...(lieuMediationNumerique.contact?.courriel == null ? {} : { courriel: lieuMediationNumerique.contact.courriel }),
  ...(lieuMediationNumerique.contact?.site_web == null ? {} : { site_web: lieuMediationNumerique.contact.site_web.join(';') })
});

export const presentationFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaLieuMediationNumeriquePresentationFields => ({
  ...(lieuMediationNumerique.presentation?.resumee == null
    ? {}
    : { presentation_resumee: lieuMediationNumerique.presentation.resumee }),
  ...(lieuMediationNumerique.presentation?.detail == null
    ? {}
    : { presentation_detail: lieuMediationNumerique.presentation.detail })
});

export const accessFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueAccessFields => ({
  ...(lieuMediationNumerique.publics_accueillis == null
    ? {}
    : { publics_accueillis: lieuMediationNumerique.publics_accueillis.join(';') }),
  ...(lieuMediationNumerique.conditions_access == null
    ? {}
    : { conditions_access: lieuMediationNumerique.conditions_access.join(';') }),
  ...(lieuMediationNumerique.modalites_accompagnement == null
    ? {}
    : { modalites_accompagnement: lieuMediationNumerique.modalites_accompagnement.join(';') }),
  ...(lieuMediationNumerique.accessibilite == null ? {} : { accessibilite: lieuMediationNumerique.accessibilite })
});

export const labelsFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueLabelsFields => ({
  ...(lieuMediationNumerique.labels_nationaux == null
    ? {}
    : { labels_nationaux: lieuMediationNumerique.labels_nationaux.join(';') }),
  ...(lieuMediationNumerique.labels_autres == null ? {} : { labels_autres: lieuMediationNumerique.labels_autres.join(';') })
});

export const disponibiliteFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaLieuMediationNumeriqueDisponibiliteFields => ({
  ...(lieuMediationNumerique.horaires == null ? {} : { horaires: lieuMediationNumerique.horaires }),
  ...(lieuMediationNumerique.prise_rdv == null ? {} : { prise_rdv: lieuMediationNumerique.prise_rdv })
});

export const collecteFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueCollecteFields => ({
  ...(lieuMediationNumerique.source == null ? {} : { source: lieuMediationNumerique.source }),
  date_maj: lieuMediationNumerique.date_maj.toISOString().split('T')[0] ?? ''
});
