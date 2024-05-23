/* eslint-disable @typescript-eslint/naming-convention, camelcase, max-lines */

import {
  Adresse,
  Contact,
  Frais,
  FraisACharge,
  Courriel,
  LabelNational,
  LabelsNationaux,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement,
  /* eslint-disable-next-line @typescript-eslint/no-shadow */
  Presentation,
  Service,
  Services,
  Typologie,
  Typologies,
  Url,
  ModaliteAcces,
  ModalitesAcces,
  PrisesEnChargeSpecifiques,
  PublicsSpecifiquementAdresses,
  PublicSpecifiquementAdresse,
  PriseEnChargeSpecifique
} from '../../../models';
import {
  ModeOrientationAccompagnateur,
  ModeOrientationBeneficiaire,
  SchemaStructureDataInclusion
} from '../schema-data-inclusion';

const THEMATIQUES_TO_SERVICES: Map<string, Service> = new Map<string, Service>([
  ['numerique--devenir-autonome-dans-les-demarches-administratives', Service.AideAuxDemarchesAdministratives],
  ['numerique--realiser-des-demarches-administratives-avec-un-accompagnement', Service.AideAuxDemarchesAdministratives],
  ['numerique--accompagner-les-demarches-de-sante', Service.AideAuxDemarchesAdministratives],
  ['numerique--prendre-en-main-un-smartphone-ou-une-tablette', Service.MaitriseDesOutilsNumeriquesDuQuotidien],
  ['numerique--prendre-en-main-un-ordinateur', Service.MaitriseDesOutilsNumeriquesDuQuotidien],
  ['numerique--utiliser-le-numerique-au-quotidien', Service.MaitriseDesOutilsNumeriquesDuQuotidien],
  ['numerique--approfondir-ma-culture-numerique', Service.ComprehensionDuMondeNumerique],
  ['numerique--favoriser-mon-insertion-professionnelle', Service.InsertionProfessionnelleViaLeNumerique],
  ['numerique--acceder-a-une-connexion-internet', Service.AccesInternetEtMaterielInformatique],
  ['numerique--acceder-a-du-materiel', Service.AccesInternetEtMaterielInformatique],
  ['numerique--s-equiper-en-materiel-informatique', Service.MaterielInformatiqueAPrixSolidaire],
  ['numerique--creer-et-developper-mon-entreprise', Service.InsertionProfessionnelleViaLeNumerique],
  ['numerique--creer-avec-le-numerique', Service.LoisirsEtCreationsNumeriques],
  ['numerique--promouvoir-la-citoyennete-numerique', Service.ComprehensionDuMondeNumerique],
  ['numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique', Service.ParentaliteEtEducationAvecLeNumerique]
]);

export const FRAIS_TO_CONDITION_ACCES: Map<string, Frais> = new Map<string, Frais>([
  ['gratuit', Frais.Gratuit],
  ['gratuit-sous-conditions', Frais.GratuitSousCondition],
  ['payant', Frais.Payant],
  ['adhesion', Frais.Payant],
  ['pass-numerique', Frais.GratuitSousCondition]
]);

export const MODES_ORIENTATION_TO_MODALITE_ACCES: Map<string, ModaliteAcces> = new Map<string, ModaliteAcces>([
  ['envoyer-un-mail', ModaliteAcces.ContacterParMail],
  ['envoyer-un-mail-avec-une-fiche-de-prescription', ModaliteAcces.PrescriptionParMail],
  ['telephoner', ModaliteAcces.Telephoner],
  ['se-presenter', ModaliteAcces.SePresenter]
]);

const LABELS_NATIONAUX_MAP: Map<string, LabelNational> = new Map<string, LabelNational>([
  ['aidants-connect', LabelNational.AidantsConnect],
  ['aptic', LabelNational.APTIC],
  ['campus-connecte', LabelNational.CampusConnecte],
  ['conseiller-numerique', LabelNational.CNFS], // todo: missing label in data.inclusion
  ['fabrique-de-territoire', LabelNational.FabriquesDeTerritoire],
  ['france-service', LabelNational.FranceServices],
  ['french-tech', LabelNational.FrenchTech],
  ['grandes-ecoles-du-numerique', LabelNational.GrandesEcolesDuNumerique],
  ['caf', LabelNational.PointRelaisCAF],
  ['pole-emploi', LabelNational.RelaisPoleEmploi]
]);

const TYPES_TO_MODALITES_ACCOMPAGNEMENT_MAP: Map<string, ModaliteAccompagnement> = new Map<string, ModaliteAccompagnement>([
  ['autonomie', ModaliteAccompagnement.EnAutonomie],
  ['accompagnement', ModaliteAccompagnement.AccompagnementIndividuel],
  ['delegation', ModaliteAccompagnement.AccompagnementIndividuel],
  ['atelier', ModaliteAccompagnement.DansUnAtelier]
]);

const PROFILS_TO_PRISES_EN_CHARGE_SPECIFIQUE: Map<string, PriseEnChargeSpecifique> = new Map<string, PriseEnChargeSpecifique>([
  ['surdite', PriseEnChargeSpecifique.Surdite],
  ['handicaps-mentaux', PriseEnChargeSpecifique.HandicapsMentaux],
  ['personnes-en-situation-illettrisme', PriseEnChargeSpecifique.Illettrisme],
  ['public-langues-etrangeres', PriseEnChargeSpecifique.LanguesEtrangeresAutre],
  ['deficience-visuelle', PriseEnChargeSpecifique.DeficienceVisuelle]
]);

const PROFILS_TO_PUBLICS_SPECIFIQUEMENT_ADRESSES: Map<string, PublicSpecifiquementAdresse> = new Map<
  string,
  PublicSpecifiquementAdresse
>([
  ['jeunes-16-26', PublicSpecifiquementAdresse.Jeunes],
  ['familles-enfants', PublicSpecifiquementAdresse.FamillesEnfants],
  ['seniors-65', PublicSpecifiquementAdresse.Seniors],
  ['femmes', PublicSpecifiquementAdresse.Femmes]
]);

export const TYPOLOGIES_MAP: Map<string, Typologie> = new Map<string, Typologie>([
  ['ACI', Typologie.ACI],
  ['ACIPHC', Typologie.ACIPHC],
  ['AFPA', Typologie.AFPA],
  ['AI', Typologie.AI],
  ['ASE', Typologie.ASE],
  ['ASSO', Typologie.ASSO],
  ['ASSO_CHOMEUR', Typologie.ASSO_CHOMEUR],
  ['AVIP', Typologie.AVIP],
  ['Autre', Typologie.AUTRE],
  ['BIB', Typologie.BIB],
  ['CAARUD', Typologie.CAARUD],
  ['CADA', Typologie.CADA],
  ['CAF', Typologie.CAF],
  ['CAP_EMPLOI', Typologie.CAP_EMPLOI],
  ['CAVA', Typologie.CAVA],
  ['CC', Typologie.CC],
  ['CCAS', Typologie.CCAS],
  ['CCONS', Typologie.CCONS],
  ['CD', Typologie.CD],
  ['CHRS', Typologie.CHRS],
  ['CHU', Typologie.CHU],
  ['CIAS', Typologie.CIAS],
  ['CIDFF', Typologie.CIDFF],
  ['CITMET', Typologie.CITMET],
  ['CPH', Typologie.CPH],
  ['CS', Typologie.CS],
  ['CSAPA', Typologie.CSAPA],
  ['DEETS', Typologie.DEETS],
  ['DEPT', Typologie.DEPT],
  ['DIPLP', Typologie.DIPLP],
  ['E2C', Typologie.E2C],
  ['EA', Typologie.EA],
  ['EATT', Typologie.EATT],
  ['EI', Typologie.EI],
  ['EITI', Typologie.EITI],
  ['EPCI', Typologie.EPCI],
  ['EPIDE', Typologie.EPIDE],
  ['ESS', Typologie.ESS],
  ['ETTI', Typologie.ETTI],
  ['FAIS', Typologie.FAIS],
  ['GEIQ', Typologie.GEIQ],
  ['HUDA', Typologie.HUDA],
  ['MDE', Typologie.MDE],
  ['MDEF', Typologie.MDEF],
  ['MDPH', Typologie.MDPH],
  ['MDS', Typologie.MDS],
  ['MJC', Typologie.MJC],
  ['ML', Typologie.ML],
  ['MQ', Typologie.MQ],
  ['MSA', Typologie.MSA],
  ['MUNI', Typologie.MUNI],
  ['OACAS', Typologie.OACAS],
  ['ODC', Typologie.ODC],
  ['OF', Typologie.OF],
  ['OIL', Typologie.OIL],
  ['OPCS', Typologie.OPCS],
  ['PAD', Typologie.PAD],
  ['PE', Typologie.PE],
  ['PENSION', Typologie.PENSION],
  ['PIJ_BIJ', Typologie.PIJ_BIJ],
  ['PIMMS', Typologie.PIMMS],
  ['PJJ', Typologie.PJJ],
  ['PLIE', Typologie.PLIE],
  ['PREF', Typologie.PREF],
  ['PREVENTION', Typologie.PREVENTION],
  ['REG', Typologie.REG],
  ['RFS', Typologie.RFS],
  ['RS_FJT', Typologie.RS_FJT],
  ['SCP', Typologie.SCP],
  ['SPIP', Typologie.SPIP],
  ['TIERS_LIEUX', Typologie.TIERS_LIEUX],
  ['UDAF', Typologie.UDAF]
]);

export const conditionsAccesFromDataInclusion = (conditionsAcces?: string[]): { frais_a_charge?: FraisACharge } =>
  conditionsAcces == null || conditionsAcces.length === 0
    ? {}
    : {
        frais_a_charge: FraisACharge(
          conditionsAcces
            .map((conditionAcces: string): Frais | undefined => FRAIS_TO_CONDITION_ACCES.get(conditionAcces))
            .filter((conditionAcces?: Frais): conditionAcces is Frais => conditionAcces != null)
        )
      };

export const contactFromDataInclusion = (courriel?: string, telephone?: string, site_web?: string): { contact?: Contact } =>
  courriel == null && telephone == null && site_web == null
    ? {}
    : {
        contact: Contact({
          ...(courriel == null ? {} : { courriel: courriel.split('|').map(Courriel) }),
          ...(telephone == null ? {} : { telephone }),
          ...(site_web == null ? {} : { site_web: site_web.split('|').map(Url) })
        })
      };

export const localisationFromDataInclusion = (latitude?: number, longitude?: number): { localisation?: Localisation } =>
  latitude == null || longitude == null ? {} : { localisation: Localisation({ latitude, longitude }) };

export const labelsFromDataInclusion = (
  labels_nationaux?: string[],
  labels_autres?: string[]
): { labels_nationaux?: LabelsNationaux; labels_autres?: string[] } => ({
  ...(labels_nationaux == null
    ? {}
    : {
        labels_nationaux: LabelsNationaux(
          labels_nationaux
            .map((labelNational: string): LabelNational | undefined => LABELS_NATIONAUX_MAP.get(labelNational))
            .filter((labelNational?: LabelNational | undefined): labelNational is LabelNational => labelNational != null)
        )
      }),
  ...(labels_autres == null ? {} : { labels_autres })
});

const hasCodeInsee = (structure: SchemaStructureDataInclusion): boolean =>
  structure.code_insee == null && structure._di_geocodage_code_insee == null;

export const adresseFromDataInclusion = (structure: SchemaStructureDataInclusion): { adresse: Adresse } => ({
  adresse: Adresse({
    code_postal: structure.code_postal,
    commune: structure.commune,
    voie: structure.adresse,
    ...(structure.complement_adresse == null ? {} : { complement_adresse: structure.complement_adresse }),
    ...(hasCodeInsee(structure) ? {} : { code_insee: structure.code_insee ?? structure._di_geocodage_code_insee })
  })
});

export const servicesFromDataInclusion = (thematiques?: string[]): { services: Services } => ({
  services: Services(
    thematiques
      ?.map((thematique: string): Service | undefined => THEMATIQUES_TO_SERVICES.get(thematique))
      .filter((service: Service | undefined): service is Service => service != null) ?? []
  )
});

export const modalitesAccompagnementFromDataInclusion = (
  types?: string[],
  modesAccueil?: string[]
): { modalites_accompagnement?: ModalitesAccompagnement } =>
  types == null || types.length === 0
    ? {}
    : {
        modalites_accompagnement: ModalitesAccompagnement([
          ...types
            .map((type: string): ModaliteAccompagnement | undefined => TYPES_TO_MODALITES_ACCOMPAGNEMENT_MAP.get(type))
            .filter(
              (modalitesAccompagnement?: ModaliteAccompagnement): modalitesAccompagnement is ModaliteAccompagnement =>
                modalitesAccompagnement != null
            ),
          ...(modesAccueil?.includes('a-distance') === true ? [ModaliteAccompagnement.ADistance] : [])
        ])
      };

export const presentationFromDataInclusion = (
  presentation_detail?: string,
  presentation_resume?: string
): {
  presentation?: Presentation;
} =>
  presentation_detail == null && presentation_resume == null
    ? {}
    : {
        presentation: {
          ...(presentation_detail == null ? {} : { detail: presentation_detail }),
          ...(presentation_resume == null ? {} : { resume: presentation_resume })
        }
      };

export const publicSpecifiquementAdresseFromDataInclusion = (
  profils?: string[]
): { publics_specifiquement_adresses?: PublicsSpecifiquementAdresses } =>
  profils == null || profils.length === 0
    ? {}
    : {
        publics_specifiquement_adresses: PublicsSpecifiquementAdresses(
          profils
            .map((profil: string): PublicSpecifiquementAdresse | undefined =>
              PROFILS_TO_PUBLICS_SPECIFIQUEMENT_ADRESSES.get(profil)
            )
            .filter(
              (
                publicSpecifiquementAdresse?: PublicSpecifiquementAdresse
              ): publicSpecifiquementAdresse is PublicSpecifiquementAdresse => publicSpecifiquementAdresse != null
            )
        )
      };

export const priseEnChargeSpecifiqueFromDataInclusion = (
  profils?: string[]
): { prise_en_charge_specifique?: PrisesEnChargeSpecifiques } =>
  profils == null || profils.length === 0
    ? {}
    : {
        prise_en_charge_specifique: PrisesEnChargeSpecifiques(
          profils
            .map((profil: string): PriseEnChargeSpecifique | undefined => PROFILS_TO_PRISES_EN_CHARGE_SPECIFIQUE.get(profil))
            .filter(
              (priseEnChargeSpecifique?: PriseEnChargeSpecifique): priseEnChargeSpecifique is PriseEnChargeSpecifique =>
                priseEnChargeSpecifique != null
            )
        )
      };

export const typologiesFromDataInclusion = (typologie?: Typologie): { typologies?: Typologies } =>
  typologie == null ? {} : { typologies: Typologies([typologie]) };

export const sourceFromDataInclusion = (source?: string): { source?: string } => (source == null ? {} : { source });

export const accessibiliteFromDataInclusion = (accessibilite?: string): { accessibilite?: Url } =>
  accessibilite == null ? {} : { accessibilite: Url(accessibilite) };

export const horairesFromDataInclusion = (horaires?: string): { horaires?: string } => (horaires == null ? {} : { horaires });

export const priseRdvFromDataInclusion = (priseRdv?: string): { prise_rdv?: Url } =>
  priseRdv == null ? {} : { prise_rdv: Url(priseRdv) };

export const structureParenteFromDataInclusion = (structureParente?: string): { structure_parente?: string } =>
  structureParente == null ? {} : { structure_parente: structureParente };

export const mergeThematiques = (thematiques?: string[], thematiquesToAdd?: string[]): { thematiques: string[] } => ({
  thematiques: Array.from(new Set([...(thematiques ?? []), ...(thematiquesToAdd ?? [])]))
});

export const mergeProfils = (profils?: string[], profilsToAdd?: string[]): { profils: string[] } => ({
  profils: Array.from(new Set([...(profils ?? []), ...(profilsToAdd ?? [])]))
});

export const mergeTypes = (types?: string[], typesToAdd?: string[]): { types: string[] } => ({
  types: Array.from(new Set([...(types ?? []), ...(typesToAdd ?? [])]))
});

export const mergeModesAccueil = (modesAccueil?: string[], modesAccueilToAdd?: string[]): { modes_accueil: string[] } => ({
  modes_accueil: Array.from(new Set([...(modesAccueil ?? []), ...(modesAccueilToAdd ?? [])]))
});

const fraisIfDefined = (frais?: string[]): { frais?: string[] } => (frais == null ? {} : { frais });

export const mergeFrais = (frais?: string[], fraisToAdd?: string[]): { frais?: string[] } =>
  fraisIfDefined(Array.from(new Set([...(frais ?? []), ...(fraisToAdd ?? [])])));

export const mergePriseRdv = (priseRdv?: string, priseRdvToAdd?: string): { prise_rdv?: string } =>
  priseRdv == null && priseRdvToAdd == null ? {} : { prise_rdv: priseRdvToAdd ?? priseRdv ?? '' };

const defaultModalitesAcces = (priseRdv?: { prise_rdv?: Url }): ModaliteAcces[] =>
  priseRdv?.prise_rdv == null ? [] : [ModaliteAcces.PrendreRdvEnLigne];

const onlyDefined = <T>(nullable?: T): nullable is T => nullable != null;

const toModaliteAccess = (modeOrientation: string): ModaliteAcces | undefined =>
  MODES_ORIENTATION_TO_MODALITE_ACCES.get(modeOrientation);

const hasModesOrientation = (modesOrientation?: string[]): modesOrientation is string[] =>
  modesOrientation != null && modesOrientation.length > 0;

export const modalitesAccesFromDataInclusion = (
  modesOrientation: string[],
  priseRdv?: { prise_rdv?: Url }
): { modalites_acces?: ModalitesAcces } => ({
  modalites_acces: ModalitesAcces([
    ...defaultModalitesAcces(priseRdv),
    ...(hasModesOrientation(modesOrientation)
      ? Array.from(new Set(modesOrientation)).map(toModaliteAccess).filter(onlyDefined)
      : [ModaliteAcces.SePresenter, ModaliteAcces.Telephoner, ModaliteAcces.ContacterParMail])
  ])
});

export const mergeModesOrientationBeneficiaire = (
  modesOrientationBeneficiaire?: ModeOrientationBeneficiaire[],
  modesOrientationBeneficiaireToAdd?: ModeOrientationBeneficiaire[]
): { modes_orientation_beneficiaire: ModeOrientationBeneficiaire[] } => ({
  modes_orientation_beneficiaire: Array.from(
    new Set([...(modesOrientationBeneficiaire ?? []), ...(modesOrientationBeneficiaireToAdd ?? [])])
  )
});

export const mergeModesOrientationAccompagnateur = (
  modesOrientationAccompagnateur?: ModeOrientationAccompagnateur[],
  modesOrientationAccompagnateurToAdd?: ModeOrientationAccompagnateur[]
): { modes_orientation_accompagnateur: ModeOrientationAccompagnateur[] } => ({
  modes_orientation_accompagnateur: Array.from(
    new Set([...(modesOrientationAccompagnateur ?? []), ...(modesOrientationAccompagnateurToAdd ?? [])])
  )
});
