/* eslint-disable @typescript-eslint/naming-convention, camelcase, max-lines */

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

export type SchemaStructureDataInclusionAccessFields = {
  profils?: string[];
  frais?: string;
  types?: string[];
};

import {
  ConditionAccess,
  LabelNational,
  LieuMediationNumerique,
  ModaliteAccompagnement,
  PublicAccueilli,
  Service
} from '../../models';

const SERVICES_TO_THEMATIQUES: Map<Service, string> = new Map<Service, string>([
  [Service.DevenirAutonomeDansLesDemarchesAdministratives, 'numerique--devenir-autonome-dans-les-demarches-administratives'],
  [Service.RealiserDesDemarchesAdministratives, 'numerique--realiser-des-demarches-administratives-avec-un-accompagnement'],
  [Service.PrendreEnMainUnSmartphoneOuUneTablette, 'numerique--prendre-en-main-un-smartphone-ou-une-tablette'],
  [Service.PrendreEnMainUnOrdinateur, 'numerique--prendre-en-main-un-ordinateur'],
  [Service.UtiliserLeNumerique, 'numerique--utiliser-le-numerique-au-quotidien'],
  [Service.ApprofondirMaCultureNumerique, 'numerique--approfondir-ma-culture-numerique'],
  [Service.FavoriserMonInsertionProfessionnelle, 'numerique--favoriser-mon-insertion-professionnelle'],
  [Service.AccederAUneConnexionInternet, 'numerique--acceder-a-une-connexion-internet'],
  [Service.AccederADuMateriel, 'numerique--acceder-a-du-materiel'],
  [Service.EquiperEnMaterielInformatique, 'numerique--s-equiper-en-materiel-informatique'],
  [Service.CreerEtDevelopperMonEntreprise, 'numerique--creer-et-developper-mon-entreprise'],
  [Service.CreerAvecLeNumerique, 'numerique--creer-avec-le-numerique'],
  [Service.AccompagnerLesDemarchesDeSante, 'numerique--accompagner-les-demarches-de-sante'],
  [Service.PromouvoirLaCitoyenneteNumerique, 'numerique--promouvoir-la-citoyennete-numerique'],
  [Service.SoutenirLaParentalite, 'numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique']
]);

const MODALITES_ACCOMPAGNEMENT_TO_TYPES_MAP: Map<ModaliteAccompagnement, string> = new Map<ModaliteAccompagnement, string>([
  [ModaliteAccompagnement.Seul, 'autonomie'],
  [ModaliteAccompagnement.AvecDeLAide, 'accompagnement'],
  [ModaliteAccompagnement.AMaPlace, 'delegation'],
  [ModaliteAccompagnement.DansUnAtelier, 'atelier']
]);

const CONDITION_ACCESS_TO_FRAIS: Map<ConditionAccess, string> = new Map<ConditionAccess, string>([
  [ConditionAccess.Gratuit, 'gratuit'],
  [ConditionAccess.GratuitSousCondition, 'gratuit-sous-conditions'],
  [ConditionAccess.Payant, 'payant'],
  [ConditionAccess.Adhesion, 'adhesion'],
  [ConditionAccess.AccepteLePassNumerique, 'pass-numerique']
]);

const PUBLICS_ACCUEILLIS_TO_PROFILS: Map<PublicAccueilli, string> = new Map<PublicAccueilli, string>([
  [PublicAccueilli.Seniors, 'seniors-65'],
  [PublicAccueilli.FamillesEnfants, 'familles-enfants'],
  [PublicAccueilli.Adultes, 'adultes'],
  [PublicAccueilli.Jeunes, 'jeunes-16-26'],
  [PublicAccueilli.LanguesEtrangeres, 'public-langues-etrangeres'],
  [PublicAccueilli.DeficienceVisuelle, 'deficience-visuelle'],
  [PublicAccueilli.Surdite, 'surdite'],
  [PublicAccueilli.HandicapsPsychiques, 'handicaps-psychiques'],
  [PublicAccueilli.HandicapsMentaux, 'handicaps-mentaux'],
  [PublicAccueilli.UniquementFemmes, 'femmes'],
  [PublicAccueilli.Illettrisme, 'personnes-en-situation-illettrisme']
]);

const LABELS_NATIONAUX_MAP: Map<LabelNational, string> = new Map<LabelNational, string>([
  [LabelNational.AidantsConnect, 'aidants-connect'],
  [LabelNational.APTIC, 'aptic'],
  [LabelNational.CampusConnecte, 'adultes'],
  [LabelNational.CNFS, 'conseiller-numerique'], // todo: missing label in data.inclusion
  [LabelNational.FabriquesDeTerritoire, 'fabrique-de-territoire'],
  [LabelNational.FranceServices, 'france-service'],
  [LabelNational.FrenchTech, 'french-tech'],
  [LabelNational.GrandesEcolesDuNumerique, 'grandes-ecoles-du-numerique'],
  [LabelNational.PointNumeriqueCAF, 'point-numerique-caf'], // todo: missing label in data.inclusion
  [LabelNational.PointRelaisCAF, 'point-relais-caf'], // todo: missing label in data.inclusion
  [LabelNational.RelaisPoleEmploi, 'relais-pole-emploi'] // todo: missing label in data.inclusion
]);

const typologyIfExist = (typologie?: string): { typologie?: string } => (typologie == null ? {} : { typologie });

const siteWebIfExist = (site_web?: string): { site_web?: string } => (site_web == null ? {} : { site_web });

const fraisIfExist = (frais?: string): { frais?: string } => (frais == null ? {} : { frais });

const fraisFromConditionAccess = (conditionAccess?: ConditionAccess): { frais?: string } =>
  conditionAccess == null ? {} : fraisIfExist(CONDITION_ACCESS_TO_FRAIS.get(conditionAccess));

export const structureGeneralFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaStructureDataInclusionStructureGeneralFields => ({
  id: lieuMediationNumerique.id,
  nom: lieuMediationNumerique.nom,
  siret: lieuMediationNumerique.pivot,
  ...(lieuMediationNumerique.typologies != null && lieuMediationNumerique.typologies.length > 0
    ? typologyIfExist(lieuMediationNumerique.typologies.at(0)?.toString())
    : {}),
  ...(lieuMediationNumerique.structure_parente == null ? {} : { structure_parente: lieuMediationNumerique.structure_parente }),
  ...(lieuMediationNumerique.accessibilite == null ? {} : { accessibilite: lieuMediationNumerique.accessibilite }),
  thematiques: [
    'numerique',
    ...lieuMediationNumerique.services
      .map((service: Service): string | null => SERVICES_TO_THEMATIQUES.get(service) ?? null)
      .filter((service: string | null): service is string => service != null)
  ]
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
    ? siteWebIfExist(lieuMediationNumerique.contact.site_web.at(0)?.toString())
    : {})
});

export const presentationFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaStructureDataInclusionPresentationFields => ({
  ...(lieuMediationNumerique.presentation?.resumee == null
    ? {}
    : {
        presentation_resume:
          lieuMediationNumerique.presentation.resumee.length > 280
            ? `${lieuMediationNumerique.presentation.resumee.slice(0, 277)}...`
            : lieuMediationNumerique.presentation.resumee
      }),
  ...(lieuMediationNumerique.presentation?.detail == null
    ? {}
    : { presentation_detail: lieuMediationNumerique.presentation.detail })
});

export const labelsFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionLabelsFields => ({
  ...(lieuMediationNumerique.labels_nationaux == null
    ? {}
    : {
        labels_nationaux: lieuMediationNumerique.labels_nationaux
          .map((labelNational: LabelNational): string | null => LABELS_NATIONAUX_MAP.get(labelNational) ?? null)
          .filter((labelNational: string | null): labelNational is string => labelNational != null)
      }),
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

const throwNoSourceError = (): string => {
  throw new Error('data.inclusion service should have a source');
};

export const serviceGeneralFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaStructureDataInclusionServiceGeneralFields => ({
  id: `${lieuMediationNumerique.id}-mediation-numerique`,
  structure_id: lieuMediationNumerique.id,
  nom: 'Médiation numérique',
  source: lieuMediationNumerique.source ?? throwNoSourceError(),
  ...(lieuMediationNumerique.prise_rdv == null
    ? {}
    : {
        prise_rdv: lieuMediationNumerique.prise_rdv
      }),
  thematiques: [
    'numerique',
    ...lieuMediationNumerique.services
      .map((service: Service): string | null => SERVICES_TO_THEMATIQUES.get(service) ?? null)
      .filter((service: string | null): service is string => service != null)
  ]
});

const typesFromModalitesAccompagnement = (lieuMediationNumerique: LieuMediationNumerique): { types: string[] } => ({
  types: (lieuMediationNumerique.modalites_accompagnement ?? [])
    .map(
      (modaliteAccompagnement: ModaliteAccompagnement): string | null =>
        MODALITES_ACCOMPAGNEMENT_TO_TYPES_MAP.get(modaliteAccompagnement) ?? null
    )
    .filter((type: string | null): type is string => type != null)
});

const profilsFromPublicsAccueillis = (lieuMediationNumerique: LieuMediationNumerique): { profils: string[] } => ({
  profils: (lieuMediationNumerique.publics_accueillis ?? [])
    .map((publicAccueilli: PublicAccueilli): string | null => PUBLICS_ACCUEILLIS_TO_PROFILS.get(publicAccueilli) ?? null)
    .filter((profil: string | null): profil is string => profil != null)
});

export const accessFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionAccessFields => ({
  ...(lieuMediationNumerique.modalites_accompagnement == null ? {} : typesFromModalitesAccompagnement(lieuMediationNumerique)),
  ...(lieuMediationNumerique.conditions_access == null
    ? {}
    : fraisFromConditionAccess(lieuMediationNumerique.conditions_access.at(0))),
  ...(lieuMediationNumerique.publics_accueillis == null ? {} : profilsFromPublicsAccueillis(lieuMediationNumerique))
});
