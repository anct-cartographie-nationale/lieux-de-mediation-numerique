/* eslint-disable @typescript-eslint/naming-convention, camelcase, max-lines */

import {
  Frais,
  LabelNational,
  LieuMediationNumerique,
  ModaliteAcces,
  ModaliteAccompagnement,
  ModalitesAccompagnement,
  PublicAccueilli,
  Service
} from '../../../models';
import {
  ModeOrientationAccompagnateur,
  ModeOrientationBeneficiaire,
  SchemaStructureDataInclusionAccesFields,
  SchemaStructureDataInclusionAdresseFields,
  SchemaStructureDataInclusionCollecteFields,
  SchemaStructureDataInclusionContactFields,
  SchemaStructureDataInclusionDisponibiliteFields,
  SchemaStructureDataInclusionLabelsFields,
  SchemaStructureDataInclusionLocalisationFields,
  SchemaStructureDataInclusionPresentationFields,
  SchemaStructureDataInclusionServiceGeneralFields,
  SchemaStructureDataInclusionStructureGeneralFields
} from '../schema-data-inclusion';

const SERVICES_TO_THEMATIQUES: Map<Service, string[]> = new Map<Service, string[]>([
  [Service.MaterielInformatiqueAPrixSolidaire, ['numerique--s-equiper-en-materiel-informatique']],
  [
    Service.AideAuxDemarchesAdministratives,
    [
      'numerique--realiser-des-demarches-administratives-avec-un-accompagnement',
      'numerique--devenir-autonome-dans-les-demarches-administratives',
      'numerique--accompagner-les-demarches-de-sante'
    ]
  ],
  [
    Service.MaitriseDesOutilsNumeriquesDuQuotidien,
    [
      'numerique--prendre-en-main-un-smartphone-ou-une-tablette',
      'numerique--prendre-en-main-un-ordinateur',
      'numerique--utiliser-le-numerique-au-quotidien'
    ]
  ],
  [
    Service.InsertionProfessionnelleViaLeNumerique,
    ['numerique--favoriser-mon-insertion-professionnelle', 'numerique--creer-et-developper-mon-entreprise']
  ],
  [Service.ParentaliteEtEducationAvecLeNumerique, ['numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique']],
  [Service.LoisirsEtCreationsNumeriques, ['numerique--creer-avec-le-numerique']],
  [
    Service.ComprehensionDuMondeNumerique,
    ['numerique--approfondir-ma-culture-numerique', 'numerique--promouvoir-la-citoyennete-numerique']
  ],
  [
    Service.AccesInternetEtMaterielInformatique,
    ['numerique--acceder-a-une-connexion-internet', 'numerique--acceder-a-du-materiel']
  ]
]);

const MODALITES_ACCOMPAGNEMENT_TO_TYPES_MAP: Map<ModaliteAccompagnement, string> = new Map<ModaliteAccompagnement, string>([
  [ModaliteAccompagnement.EnAutonomie, 'autonomie'],
  [ModaliteAccompagnement.AccompagnementIndividuel, 'accompagnement'],
  [ModaliteAccompagnement.DansUnAtelier, 'atelier']
]);

const CONDITION_ACCES_TO_FRAIS: Map<Frais, string> = new Map<Frais, string>([
  [Frais.Gratuit, 'gratuit'],
  [Frais.GratuitSousCondition, 'gratuit-sous-conditions'],
  [Frais.Payant, 'payant']
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

const MODALITE_ACCESS_TO_MODE_ORIENTATION_BENEFICIAIRE: Map<ModaliteAcces, ModeOrientationBeneficiaire> = new Map<
  ModaliteAcces,
  ModeOrientationBeneficiaire
>([
  [ModaliteAcces.ContacterParMail, 'envoyer-un-mail'],
  [ModaliteAcces.SePresenter, 'se-presenter'],
  [ModaliteAcces.Telephoner, 'telephoner']
]);

const MODALITE_ACCESS_TO_MODE_ORIENTATION_ACCOMPAGNATEUR: Map<ModaliteAcces, ModeOrientationAccompagnateur> = new Map<
  ModaliteAcces,
  ModeOrientationAccompagnateur
>([
  [ModaliteAcces.ContacterParMail, 'envoyer-un-mail'],
  [ModaliteAcces.PrescriptionParMail, 'envoyer-un-mail-avec-une-fiche-de-prescription'],
  [ModaliteAcces.Telephoner, 'telephoner']
]);

const LABELS_NATIONAUX_MAP: Map<LabelNational, string> = new Map<LabelNational, string>([
  [LabelNational.AidantsConnect, 'aidants-connect'],
  [LabelNational.APTIC, 'aptic'],
  [LabelNational.CampusConnecte, 'campus-connecte'],
  [LabelNational.CNFS, 'conseiller-numerique'], // todo: missing label in data.inclusion
  [LabelNational.FabriquesDeTerritoire, 'fabrique-de-territoire'],
  [LabelNational.FranceServices, 'france-service'],
  [LabelNational.FrenchTech, 'french-tech'],
  [LabelNational.GrandesEcolesDuNumerique, 'grandes-ecoles-du-numerique'],
  [LabelNational.PointNumeriqueCAF, 'caf'],
  [LabelNational.PointRelaisCAF, 'caf'],
  [LabelNational.RelaisPoleEmploi, 'pole-emploi']
]);

const typologyIfExist = (typologie?: string): { typologie?: string } => (typologie == null ? {} : { typologie });

const siteWebIfExist = (site_web?: string): { site_web?: string } => (site_web == null ? {} : { site_web });

const courrielIfExist = (courriel?: string): { courriel?: string } => (courriel == null ? {} : { courriel });

const fraisIfExist = (frais?: string): { frais?: string[] } => (frais == null ? {} : { frais: [frais] });

const fraisFromConditionAcces = (conditionAcces?: Frais): { frais?: string[] } =>
  conditionAcces == null ? {} : fraisIfExist(CONDITION_ACCES_TO_FRAIS.get(conditionAcces));

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
    ...(lieuMediationNumerique.services ?? [])
      .flatMap((service: Service): string[] | null => SERVICES_TO_THEMATIQUES.get(service) ?? [])
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
  ...(lieuMediationNumerique.contact?.courriel != null && lieuMediationNumerique.contact.courriel.length > 0
    ? courrielIfExist(lieuMediationNumerique.contact.courriel.at(0)?.toString())
    : {}),
  ...(lieuMediationNumerique.contact?.site_web != null && lieuMediationNumerique.contact.site_web.length > 0
    ? siteWebIfExist(lieuMediationNumerique.contact.site_web.at(0)?.toString())
    : {})
});

export const presentationFields = (
  lieuMediationNumerique: LieuMediationNumerique
): SchemaStructureDataInclusionPresentationFields => ({
  ...(lieuMediationNumerique.presentation?.resume == null
    ? {}
    : {
        presentation_resume:
          lieuMediationNumerique.presentation.resume.length > 280
            ? `${lieuMediationNumerique.presentation.resume.slice(0, 277)}...`
            : lieuMediationNumerique.presentation.resume
      }),
  ...(lieuMediationNumerique.presentation?.detail == null
    ? {}
    : { presentation_detail: lieuMediationNumerique.presentation.detail })
});

export const labelsFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionLabelsFields => ({
  ...(lieuMediationNumerique.labels_nationaux == null
    ? {}
    : {
        labels_nationaux: Array.from(
          new Set(
            lieuMediationNumerique.labels_nationaux
              .map((labelNational: LabelNational): string | null => LABELS_NATIONAUX_MAP.get(labelNational) ?? null)
              .filter((labelNational: string | null): labelNational is string => labelNational != null)
          )
        )
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
    ...(lieuMediationNumerique.services ?? [])
      .flatMap((service: Service): string[] | null => SERVICES_TO_THEMATIQUES.get(service) ?? [])
      .filter((service: string | null): service is string => service != null)
  ]
});

const typesFromModalitesAccompagnement = (lieuMediationNumerique: LieuMediationNumerique): { types?: string[] } => {
  const types: string[] = (lieuMediationNumerique.modalites_accompagnement ?? [])
    .map(
      (modaliteAccompagnement: ModaliteAccompagnement): string | null =>
        MODALITES_ACCOMPAGNEMENT_TO_TYPES_MAP.get(modaliteAccompagnement) ?? null
    )
    .filter((type: string | null): type is string => type != null);

  return types.length === 0 ? {} : { types };
};

const isEnPresentiel = (modalitesAccompagnement: ModalitesAccompagnement): boolean =>
  modalitesAccompagnement.filter(
    (modaliteAccompagnement: ModaliteAccompagnement): boolean => modaliteAccompagnement !== ModaliteAccompagnement.ADistance
  ).length > 0;

const isADistance = (modalitesAccompagnement: ModalitesAccompagnement): boolean =>
  modalitesAccompagnement.includes(ModaliteAccompagnement.ADistance);

const modesAccueilFromModalitesAccompagnement = (lieuMediationNumerique: LieuMediationNumerique): { modes_accueil: string[] } =>
  lieuMediationNumerique.modalites_accompagnement == null
    ? { modes_accueil: [] }
    : {
        modes_accueil: [
          ...(isADistance(lieuMediationNumerique.modalites_accompagnement) ? ['a-distance'] : []),
          ...(isEnPresentiel(lieuMediationNumerique.modalites_accompagnement) ? ['en-presentiel'] : [])
        ]
      };

const profilsFromPublicsAccueillis = (lieuMediationNumerique: LieuMediationNumerique): { profils: string[] } => ({
  profils: (lieuMediationNumerique.publics_accueillis ?? [])
    .map((publicAccueilli: PublicAccueilli): string | null => PUBLICS_ACCUEILLIS_TO_PROFILS.get(publicAccueilli) ?? null)
    .filter((profil: string | null): profil is string => profil != null)
});

const modeOrientationFromModalitesAcces = (
  lieuMediationNumerique: LieuMediationNumerique
): {
  modes_orientation_accompagnateur: ModeOrientationAccompagnateur[];
  modes_orientation_beneficiaire: ModeOrientationBeneficiaire[];
} => ({
  modes_orientation_accompagnateur: (lieuMediationNumerique.modalites_acces ?? [])
    .map(
      (modaliteAcces: ModaliteAcces): ModeOrientationAccompagnateur | null =>
        MODALITE_ACCESS_TO_MODE_ORIENTATION_ACCOMPAGNATEUR.get(modaliteAcces) ?? null
    )
    .filter(
      (modaliteAcces: ModeOrientationAccompagnateur | null): modaliteAcces is ModeOrientationAccompagnateur =>
        modaliteAcces != null
    ),
  modes_orientation_beneficiaire: (lieuMediationNumerique.modalites_acces ?? [])
    .map(
      (modaliteAcces: ModaliteAcces): ModeOrientationBeneficiaire | null =>
        MODALITE_ACCESS_TO_MODE_ORIENTATION_BENEFICIAIRE.get(modaliteAcces) ?? null
    )
    .filter(
      (modaliteAcces: ModeOrientationBeneficiaire | null): modaliteAcces is ModeOrientationBeneficiaire => modaliteAcces != null
    )
});

export const accesFields = (lieuMediationNumerique: LieuMediationNumerique): SchemaStructureDataInclusionAccesFields => ({
  ...(lieuMediationNumerique.modalites_accompagnement == null ? {} : typesFromModalitesAccompagnement(lieuMediationNumerique)),
  ...(lieuMediationNumerique.modalites_accompagnement == null
    ? {}
    : modesAccueilFromModalitesAccompagnement(lieuMediationNumerique)),
  ...(lieuMediationNumerique.frais_a_charge == null
    ? {}
    : fraisFromConditionAcces(lieuMediationNumerique.frais_a_charge.at(0))),
  ...(lieuMediationNumerique.publics_accueillis == null ? {} : profilsFromPublicsAccueillis(lieuMediationNumerique)),
  ...(lieuMediationNumerique.modalites_acces == null ? {} : modeOrientationFromModalitesAcces(lieuMediationNumerique))
});
