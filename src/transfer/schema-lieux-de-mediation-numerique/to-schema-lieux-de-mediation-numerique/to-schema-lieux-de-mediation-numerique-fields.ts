/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { LieuMediationNumerique } from '../../../models';
import {
  SchemaLieuMediationNumeriqueAccesFields,
  SchemaLieuMediationNumeriqueAdresseFields,
  SchemaLieuMediationNumeriqueCollecteFields,
  SchemaLieuMediationNumeriqueContactFields,
  SchemaLieuMediationNumeriqueDisponibiliteFields,
  SchemaLieuMediationNumeriqueGeneralFields,
  SchemaLieuMediationNumeriqueLabelsFields,
  SchemaLieuMediationNumeriqueLocalisationFields,
  SchemaLieuMediationNumeriquePresentationFields
} from '../schema-lieux-de-mediation-numerique';

export const generalFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueGeneralFields => ({
  id: lieuMediationNumerique.id,
  nom: lieuMediationNumerique.nom,
  services: lieuMediationNumerique.services.join(';'),
  pivot: lieuMediationNumerique.pivot,
  ...(lieuMediationNumerique.typologies == null ? {} : { typologie: lieuMediationNumerique.typologies.join(';') }),
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
  ...(lieuMediationNumerique.presentation?.resume == null
    ? {}
    : { presentation_resume: lieuMediationNumerique.presentation.resume }),
  ...(lieuMediationNumerique.presentation?.detail == null
    ? {}
    : { presentation_detail: lieuMediationNumerique.presentation.detail })
});

export const accesFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueAccesFields => ({
  ...(lieuMediationNumerique.publics_accueillis == null
    ? {}
    : { publics_accueillis: lieuMediationNumerique.publics_accueillis.join(';') }),
  ...(lieuMediationNumerique.conditions_acces == null
    ? {}
    : { conditions_acces: lieuMediationNumerique.conditions_acces.join(';') }),
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
