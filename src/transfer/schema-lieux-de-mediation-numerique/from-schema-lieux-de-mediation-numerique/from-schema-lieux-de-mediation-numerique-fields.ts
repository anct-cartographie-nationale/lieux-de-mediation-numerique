/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  Adresse,
  Contact,
  Courriel,
  FraisACharge,
  Itinerances,
  LabelsNationaux,
  Localisation,
  ModaliteAcces,
  ModalitesAcces,
  ModalitesAccompagnement,
  /* eslint-disable-next-line @typescript-eslint/no-shadow */
  Presentation,
  PublicsAccueillis,
  Services,
  toAccessibleLieu,
  Typologies,
  Url
} from '../../../models';
import { SchemaLieuMediationNumerique } from '../schema-lieux-de-mediation-numerique';

const toListOf = <T>(listItem: string): T => listItem as T;

export const listFromString = <T>(stringList: string): T[] => stringList.split('|').map(toListOf<T>);

const hasServices = (services?: Services): boolean => services != null && services.length > 0;

export const servicesIfAny = (services?: string): { services?: Services } =>
  services == null ? {} : { services: Services(listFromString(services)) };

export const localisationIfAny = (latitude?: number, longitude?: number): { localisation?: Localisation } =>
  latitude == null || longitude == null ? {} : { localisation: Localisation({ latitude, longitude }) };

export const adresse = (schemaLieuMediationNumerique: SchemaLieuMediationNumerique): { adresse: Adresse } => ({
  adresse: Adresse({
    code_postal: schemaLieuMediationNumerique.code_postal,
    commune: schemaLieuMediationNumerique.commune,
    voie: schemaLieuMediationNumerique.adresse,
    ...codeInseeIfAny(schemaLieuMediationNumerique.code_insee),
    ...complementAdresseIfAny(schemaLieuMediationNumerique.complement_adresse)
  })
});

const codeInseeIfAny = (codeInsee?: string): { code_insee?: string } => (codeInsee == null ? {} : { code_insee: codeInsee });

const complementAdresseIfAny = (complementAdresse?: string): { complement_adresse?: string } =>
  complementAdresse == null ? {} : { complement_adresse: complementAdresse };

export const typologiesIfAny = (typologies?: string): { typologies?: Typologies } =>
  typologies == null ? {} : { typologies: Typologies(listFromString(typologies)) };

const telephoneIfAny = (telephone?: string): { telephone?: string } => (telephone == null ? {} : { telephone });

const courrielIfAny = (courriel?: string): { courriel?: Courriel[] } =>
  courriel == null ? {} : { courriel: listFromString(courriel) };

const siteWebIfAny = (siteWeb?: string): { site_web?: Url[] } => (siteWeb == null ? {} : { site_web: listFromString(siteWeb) });

export const contactIfAny = (schemaLieuMediationNumerique: SchemaLieuMediationNumerique): { contact?: Contact } =>
  schemaLieuMediationNumerique.telephone == null &&
  schemaLieuMediationNumerique.courriel == null &&
  schemaLieuMediationNumerique.site_web == null
    ? {}
    : {
        contact: Contact({
          ...telephoneIfAny(schemaLieuMediationNumerique.telephone),
          ...courrielIfAny(schemaLieuMediationNumerique.courriel),
          ...siteWebIfAny(schemaLieuMediationNumerique.site_web)
        })
      };

export const horairesIfAny = (horaires?: string): { horaires?: string } => (horaires == null ? {} : { horaires });

const resumeIfAny = (resume?: string): { resume?: string } => (resume == null ? {} : { resume });

const detailIfAny = (detail?: string): { detail?: string } => (detail == null ? {} : { detail });

export const presentationIfAny = (
  schemaLieuMediationNumerique: SchemaLieuMediationNumerique
): { presentation?: Presentation } =>
  schemaLieuMediationNumerique.presentation_resume == null && schemaLieuMediationNumerique.presentation_detail == null
    ? {}
    : {
        presentation: {
          ...resumeIfAny(schemaLieuMediationNumerique.presentation_resume),
          ...detailIfAny(schemaLieuMediationNumerique.presentation_detail)
        }
      };

export const sourceIfAny = (source?: string): { source?: string } => (source == null ? {} : { source });

export const structureParenteIfAny = (structureParente?: string): { structure_parente?: string } =>
  structureParente == null ? {} : { structure_parente: structureParente };

export const publicsAccueillisIfAny = (
  publicsAccueillis?: string,
  services?: Services
): { publics_accueillis?: PublicsAccueillis } =>
  publicsAccueillis == null || !hasServices(services)
    ? {}
    : { publics_accueillis: PublicsAccueillis(listFromString(publicsAccueillis)) };

export const fraisAChargeIfAny = (conditionsAcces?: string, services?: Services): { frais_a_charge?: FraisACharge } =>
  conditionsAcces == null || !hasServices(services) ? {} : { frais_a_charge: FraisACharge(listFromString(conditionsAcces)) };

export const itinerancesIfAny = (itinerance?: string, services?: Services): { itinerance?: Itinerances } =>
  itinerance == null || !hasServices(services) ? {} : { itinerance: Itinerances(listFromString(itinerance)) };

export const labelsNationauxIfAny = (labelsNationaux?: string): { labels_nationaux?: LabelsNationaux } =>
  labelsNationaux == null ? {} : { labels_nationaux: LabelsNationaux(listFromString(labelsNationaux)) };

export const labelsAutresIfAny = (labelsAutres?: string): { labels_autres?: string[] } =>
  labelsAutres == null ? {} : { labels_autres: listFromString(labelsAutres) };

export const modalitesAccompagnementIfAny = (
  modalitesAccompagnement?: string,
  services?: Services
): { modalites_accompagnement?: ModalitesAccompagnement } =>
  modalitesAccompagnement == null || !hasServices(services)
    ? {}
    : { modalites_accompagnement: ModalitesAccompagnement(listFromString(modalitesAccompagnement)) };

const PublicAccess = (modalitesAcces?: string): { modalites_acces?: ModalitesAcces } =>
  modalitesAcces == null
    ? {}
    : {
        modalites_acces: ModalitesAcces(listFromString<ModaliteAcces>(modalitesAcces).filter(toAccessibleLieu))
      };
const noPublicAccess = (): { modalites_acces: ModalitesAcces } => ({
  modalites_acces: ModalitesAcces([ModaliteAcces.PasDePublic])
});

export const modalitesAccessIfAny = (modalitesAcces?: string, services?: Services): { modalites_acces?: ModalitesAcces } =>
  hasServices(services) ? PublicAccess(modalitesAcces) : noPublicAccess();

export const accessibiliteIfAny = (accessibilite?: string): { accessibilite?: Url } =>
  accessibilite == null ? {} : { accessibilite: Url(accessibilite) };

export const priseRdvIfAny = (priseRdv?: string): { prise_rdv?: Url } => (priseRdv == null ? {} : { prise_rdv: Url(priseRdv) });
