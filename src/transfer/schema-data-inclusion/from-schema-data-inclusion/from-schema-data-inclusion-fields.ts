/* eslint-disable @typescript-eslint/naming-convention, camelcase, max-lines */

import { SchemaStructureDataInclusion } from '../schema-data-inclusion';
import {
  Adresse,
  ConditionAcces,
  ConditionsAcces,
  Contact,
  DispositifProgrammeNational,
  DispositifsProgrammesNationaux,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement,
  /* eslint-disable-next-line @typescript-eslint/no-shadow */
  Presentation,
  PublicAccueilli,
  PublicsAccueillis,
  Service,
  Services,
  Typologie,
  Typologies,
  Url
} from '../../../models';

const THEMATIQUES_TO_SERVICES: Map<string, Service> = new Map<string, Service>([
  ['numerique--devenir-autonome-dans-les-demarches-administratives', Service.DevenirAutonomeDansLesDemarchesAdministratives],
  ['numerique--realiser-des-demarches-administratives-avec-un-accompagnement', Service.RealiserDesDemarchesAdministratives],
  ['numerique--prendre-en-main-un-smartphone-ou-une-tablette', Service.PrendreEnMainUnSmartphoneOuUneTablette],
  ['numerique--prendre-en-main-un-ordinateur', Service.PrendreEnMainUnOrdinateur],
  ['numerique--utiliser-le-numerique-au-quotidien', Service.UtiliserLeNumerique],
  ['numerique--approfondir-ma-culture-numerique', Service.ApprofondirMaCultureNumerique],
  ['numerique--favoriser-mon-insertion-professionnelle', Service.FavoriserMonInsertionProfessionnelle],
  ['numerique--acceder-a-une-connexion-internet', Service.AccederAUneConnexionInternet],
  ['numerique--acceder-a-du-materiel', Service.AccederADuMateriel],
  ['numerique--s-equiper-en-materiel-informatique', Service.EquiperEnMaterielInformatique],
  ['numerique--creer-et-developper-mon-entreprise', Service.CreerEtDevelopperMonEntreprise],
  ['numerique--creer-avec-le-numerique', Service.CreerAvecLeNumerique],
  ['numerique--accompagner-les-demarches-de-sante', Service.AccompagnerLesDemarchesDeSante],
  ['numerique--promouvoir-la-citoyennete-numerique', Service.PromouvoirLaCitoyenneteNumerique],
  ['numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique', Service.SoutenirLaParentalite]
]);

export const FRAIS_TO_CONDITION_ACCES: Map<string, ConditionAcces> = new Map<string, ConditionAcces>([
  ['gratuit', ConditionAcces.Gratuit],
  ['gratuit-sous-conditions', ConditionAcces.GratuitSousCondition],
  ['payant', ConditionAcces.Payant],
  ['adhesion', ConditionAcces.Adhesion],
  ['pass-numerique', ConditionAcces.AccepteLePassNumerique]
]);

const DISPOSITIFS_PROGRAMMES_NATIONAUX_MAP: Map<string, DispositifProgrammeNational> = new Map<
  string,
  DispositifProgrammeNational
>([
  ['aidants-connect', DispositifProgrammeNational.AidantsConnect],
  ['bibliotheque-de-reference', DispositifProgrammeNational.BibliothequesNumeriqueDeReference], // todo: missing label in data.inclusion
  ['certification-pix', DispositifProgrammeNational.CertificationPix], // todo: missing label in data.inclusion
  ['conseillers-numeriques', DispositifProgrammeNational.ConseillersNumeriques], // todo: missing label in data.inclusion
  ['emmaus', DispositifProgrammeNational.EmmausConnect],
  ['france-service', DispositifProgrammeNational.FranceServices],
  ['grandes-ecoles-du-numerique', DispositifProgrammeNational.GrandesEcolesDuNumerique],
  ['croix-rouge', DispositifProgrammeNational.LaCroixRouge],
  ['caf', DispositifProgrammeNational.PointAccesNumeriqueCAF],
  ['promeneurs-du-net', DispositifProgrammeNational.PromeneursDuNet], // todo: missing label in data.inclusion
  ['emmaus', DispositifProgrammeNational.RelaisNumerique]
]);

const TYPES_TO_MODALITES_ACCOMPAGNEMENT_MAP: Map<string, ModaliteAccompagnement> = new Map<string, ModaliteAccompagnement>([
  ['autonomie', ModaliteAccompagnement.Seul],
  ['accompagnement', ModaliteAccompagnement.AvecDeLAide],
  ['delegation', ModaliteAccompagnement.AMaPlace],
  ['atelier', ModaliteAccompagnement.DansUnAtelier]
]);

const PROFILS_TO_PUBLICS_ACCUEILLIS: Map<string, PublicAccueilli> = new Map<string, PublicAccueilli>([
  ['seniors-65', PublicAccueilli.Seniors],
  ['familles-enfants', PublicAccueilli.FamillesEnfants],
  ['adultes', PublicAccueilli.Adultes],
  ['jeunes-16-26', PublicAccueilli.Jeunes],
  ['public-langues-etrangeres', PublicAccueilli.LanguesEtrangeres],
  ['deficience-visuelle', PublicAccueilli.DeficienceVisuelle],
  ['surdite', PublicAccueilli.Surdite],
  ['handicaps-psychiques', PublicAccueilli.HandicapsPsychiques],
  ['handicaps-mentaux', PublicAccueilli.HandicapsMentaux],
  ['femmes', PublicAccueilli.UniquementFemmes],
  ['personnes-en-situation-illettrisme', PublicAccueilli.Illettrisme]
]);

export const TYPOLOGIES_MAP: Map<string, Typologie> = new Map<string, Typologie>([
  ['ACI', Typologie.ACI],
  ['ACIPHC', Typologie.ACIPHC],
  ['AFPA', Typologie.AFPA],
  ['AI', Typologie.AI],
  ['ASE', Typologie.ASE],
  ['ASSO', Typologie.ASSO],
  ['ASSO_CHOMEUR', Typologie.ASSO_CHOMEUR],
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

export const conditionsAccesFromDataInclusion = (conditionsAcces?: string[]): { conditions_acces?: ConditionsAcces } =>
  conditionsAcces == null || conditionsAcces.length === 0
    ? {}
    : {
        conditions_acces: ConditionsAcces(
          conditionsAcces
            .map((conditionAcces: string): ConditionAcces | undefined => FRAIS_TO_CONDITION_ACCES.get(conditionAcces))
            .filter((conditionAcces?: ConditionAcces): conditionAcces is ConditionAcces => conditionAcces != null)
        )
      };

export const contactFromDataInclusion = (courriel?: string, telephone?: string, site_web?: string): { contact?: Contact } =>
  courriel == null && telephone == null && site_web == null
    ? {}
    : {
        contact: Contact({
          ...(courriel == null ? {} : { courriel }),
          ...(telephone == null ? {} : { telephone }),
          ...(site_web == null ? {} : { site_web: site_web.split(';').map(Url) })
        })
      };

export const localisationFromDataInclusion = (latitude?: number, longitude?: number): { localisation?: Localisation } =>
  latitude == null || longitude == null ? {} : { localisation: Localisation({ latitude, longitude }) };

export const labelsFromDataInclusion = (
  dispositifs_programmes_nationaux?: string[],
  labels_autres?: string[]
): { dispositifs_programmes_nationaux?: DispositifsProgrammesNationaux; labels_autres?: string[] } => ({
  ...(dispositifs_programmes_nationaux == null
    ? {}
    : {
        dispositifs_programmes_nationaux: DispositifsProgrammesNationaux(
          dispositifs_programmes_nationaux
            .map((dispositifProgrammeNational: string): DispositifProgrammeNational | undefined =>
              DISPOSITIFS_PROGRAMMES_NATIONAUX_MAP.get(dispositifProgrammeNational)
            )
            .filter(
              (
                dispositifProgrammeNational?: DispositifProgrammeNational | undefined
              ): dispositifProgrammeNational is DispositifProgrammeNational => dispositifProgrammeNational != null
            )
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
  types?: string[]
): { modalites_accompagnement?: ModalitesAccompagnement } =>
  types == null || types.length === 0
    ? {}
    : {
        modalites_accompagnement: ModalitesAccompagnement(
          types
            .map((type: string): ModaliteAccompagnement | undefined => TYPES_TO_MODALITES_ACCOMPAGNEMENT_MAP.get(type))
            .filter(
              (modalitesAccompagnement?: ModaliteAccompagnement): modalitesAccompagnement is ModaliteAccompagnement =>
                modalitesAccompagnement != null
            )
        )
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

export const publicsAccueillisFromDataInclusion = (profils?: string[]): { publics_accueillis?: PublicsAccueillis } =>
  profils == null || profils.length === 0
    ? {}
    : {
        publics_accueillis: PublicsAccueillis(
          profils
            .map((profil: string): PublicAccueilli | undefined => PROFILS_TO_PUBLICS_ACCUEILLIS.get(profil))
            .filter((publicAccueilli?: PublicAccueilli): publicAccueilli is PublicAccueilli => publicAccueilli != null)
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

const fraisIfDefined = (frais?: string[]): { frais?: string[] } => (frais == null ? {} : { frais });

export const mergeFrais = (frais?: string[], fraisToAdd?: string[]): { frais?: string[] } =>
  fraisIfDefined(Array.from(new Set([...(frais ?? []), ...(fraisToAdd ?? [])])));

export const mergePriseRdv = (priseRdv?: string, priseRdvToAdd?: string): { prise_rdv?: string } =>
  priseRdv == null && priseRdvToAdd == null ? {} : { prise_rdv: priseRdvToAdd ?? priseRdv ?? '' };
