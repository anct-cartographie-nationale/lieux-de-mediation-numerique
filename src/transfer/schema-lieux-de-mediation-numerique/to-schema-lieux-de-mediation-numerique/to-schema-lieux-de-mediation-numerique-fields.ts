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
  pivot: lieuMediationNumerique.pivot,
  ...(lieuMediationNumerique.services == null ? {} : { services: lieuMediationNumerique.services.join('|') }),
  ...(lieuMediationNumerique.typologies == null ? {} : { typologie: lieuMediationNumerique.typologies.join('|') }),
  ...(lieuMediationNumerique.structure_parente == null ? {} : { structure_parente: lieuMediationNumerique.structure_parente })
});

export const adresseFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueAdresseFields => ({
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
): SchemaLieuMediationNumeriqueLocalisationFields => ({
  ...(lieuMediationNumerique.localisation?.latitude == null ? {} : { latitude: lieuMediationNumerique.localisation.latitude }),
  ...(lieuMediationNumerique.localisation?.longitude == null
    ? {}
    : { longitude: lieuMediationNumerique.localisation.longitude })
});

export const contactFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueContactFields => ({
  ...(lieuMediationNumerique.contact?.telephone == null ? {} : { telephone: lieuMediationNumerique.contact.telephone }),
  ...(lieuMediationNumerique.contact?.courriels == null
    ? {}
    : { courriels: lieuMediationNumerique.contact.courriels.join('|') }),
  ...(lieuMediationNumerique.contact?.site_web == null ? {} : { site_web: lieuMediationNumerique.contact.site_web.join('|') })
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
  ...(lieuMediationNumerique.publics_specifiquement_adresses == null
    ? {}
    : { publics_specifiquement_adresses: lieuMediationNumerique.publics_specifiquement_adresses.join('|') }),
  ...(lieuMediationNumerique.prise_en_charge_specifique == null
    ? {}
    : { prise_en_charge_specifique: lieuMediationNumerique.prise_en_charge_specifique.join('|') }),
  ...(lieuMediationNumerique.frais_a_charge == null ? {} : { frais_a_charge: lieuMediationNumerique.frais_a_charge.join('|') }),
  ...(lieuMediationNumerique.itinerance == null ? {} : { itinerance: lieuMediationNumerique.itinerance.join('|') }),
  ...(lieuMediationNumerique.modalites_acces == null
    ? {}
    : { modalites_acces: lieuMediationNumerique.modalites_acces.join('|') }),
  ...(lieuMediationNumerique.modalites_accompagnement == null
    ? {}
    : { modalites_accompagnement: lieuMediationNumerique.modalites_accompagnement.join('|') }),
  ...(lieuMediationNumerique.fiche_acces_libre == null ? {} : { fiche_acces_libre: lieuMediationNumerique.fiche_acces_libre })
});

export const labelsFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueLabelsFields => ({
  ...(lieuMediationNumerique.dispositif_programmes_nationaux == null
    ? {}
    : { dispositif_programmes_nationaux: lieuMediationNumerique.dispositif_programmes_nationaux.join('|') }),
  ...(lieuMediationNumerique.formations_labels == null
    ? {}
    : { formations_labels: lieuMediationNumerique.formations_labels.join('|') }),
  ...(lieuMediationNumerique.autres_formations_labels == null
    ? {}
    : { autres_formations_labels: lieuMediationNumerique.autres_formations_labels.join('|') })
});

export const disponibiliteFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaLieuMediationNumeriqueDisponibiliteFields => ({
  ...(lieuMediationNumerique.horaires == null ? {} : { horaires: lieuMediationNumerique.horaires }),
  ...(lieuMediationNumerique.prise_rdv == null ? {} : { prise_rdv: lieuMediationNumerique.prise_rdv })
});

const stringDate = (lieuMediationNumerique: LieuMediationNumerique): string | undefined =>
  lieuMediationNumerique.date_maj instanceof Date
    ? lieuMediationNumerique.date_maj.toISOString()
    : lieuMediationNumerique.date_maj;

export const collecteFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumeriqueCollecteFields => ({
  ...(lieuMediationNumerique.source == null ? {} : { source: lieuMediationNumerique.source }),
  date_maj: stringDate(lieuMediationNumerique)?.split('T')[0] ?? ''
});
