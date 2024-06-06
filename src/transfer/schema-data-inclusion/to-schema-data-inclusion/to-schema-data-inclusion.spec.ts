/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  Adresse,
  Contact,
  Courriel,
  DispositifProgrammeNational,
  DispositifProgrammesNationaux,
  FormationLabel,
  FormationsLabels,
  Frais,
  FraisACharge,
  Id,
  LieuMediationNumerique,
  Localisation,
  ModaliteAcces,
  ModaliteAccompagnement,
  ModalitesAcces,
  ModalitesAccompagnement,
  Nom,
  Pivot,
  PriseEnChargeSpecifique,
  PrisesEnChargeSpecifiques,
  PublicSpecifiquementAdresse,
  PublicsSpecifiquementAdresses,
  Service,
  Services,
  Typologie,
  Typologies,
  Url
} from '../../../models';
import { SchemaServiceDataInclusion, SchemaStructureDataInclusion } from '../schema-data-inclusion';
import { toSchemaServicesDataInclusion, toSchemaStructuresDataInclusion } from './to-schema-data-inclusion';

describe('to schema data.inclusion', (): void => {
  it('should convert minimal lieux de mediation numerique model to data.inclusion structure schema', (): void => {
    const minimalLieuMediationNumerique: LieuMediationNumerique = {
      id: Id('c3d15659-8de9-4fd6-b283-04d50f6ace57'),
      nom: Nom('MOBILETTE'),
      pivot: Pivot('60487647500499'),
      adresse: Adresse({
        code_postal: '09891',
        commune: 'Robinboeuf',
        voie: '3 RUE DE LECLERCQ'
      }),
      services: Services([Service.AideAuxDemarchesAdministratives]),
      date_maj: new Date('2022-04-28'),
      presentation: {
        resume:
          'L’association Mobilette propose des solutions de déplacement aux personnes pour qui la non-mobilité est un frein à l’insertion professionnelle'
      }
    };

    expect(toSchemaStructuresDataInclusion([minimalLieuMediationNumerique])).toStrictEqual<SchemaStructureDataInclusion[]>([
      {
        id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
        siret: '60487647500499',
        nom: 'MOBILETTE',
        commune: 'Robinboeuf',
        code_postal: '09891',
        adresse: '3 RUE DE LECLERCQ',
        date_maj: '2022-04-28T00:00:00.000Z',
        thematiques: [
          'numerique',
          'numerique--realiser-des-demarches-administratives-avec-un-accompagnement',
          'numerique--devenir-autonome-dans-les-demarches-administratives',
          'numerique--accompagner-les-demarches-de-sante'
        ],
        presentation_resume:
          'L’association Mobilette propose des solutions de déplacement aux personnes pour qui la non-mobilité est un frein à l’insertion professionnelle'
      }
    ]);
  });

  it('should convert full lieux de mediation numerique model to data.inclusion structure schema', (): void => {
    const lieuMediationNumerique: LieuMediationNumerique = {
      id: Id('c3d15659-8de9-4fd6-b283-04d50f6ace57'),
      pivot: Pivot('60487647500499'),
      nom: Nom('MOBILETTE'),
      adresse: Adresse({
        code_postal: '09891',
        commune: 'Robinboeuf',
        voie: '3 RUE DE LECLERCQ',
        code_insee: '09890',
        complement_adresse: 'HOTEL DE VILLE'
      }),
      localisation: Localisation({
        latitude: 48.7703,
        longitude: 7.848133
      }),
      typologies: Typologies([Typologie.ASSO]),
      contact: Contact({
        site_web: [Url('https://www.asso-gonzalez.net/'), Url('https://www.facebook.com/asso-gonzalez.net/')],
        telephone: '0102030405',
        courriel: [Courriel('julie@example.net'), Courriel('paul@example.net')]
      }),
      horaires: 'Mo-Fr 10:00-20:00 "sur rendez-vous"; PH off',
      presentation: {
        resume:
          'L’association Mobilette propose des solutions de déplacement aux personnes pour qui la non-mobilité est un frein à l’insertion professionnelle, nous sommes spécialisés dans la mobilité en milieu rurale, mais nous pouvons également proposer un accompagnement pour la mobilité en milieu urbain.',
        detail:
          "connaissance de l'offre de transport du territoire / accès à un véhicule 2 ou 4 roues / transport solidaire / accès au permis"
      },
      source: 'solidagregateur',
      structure_parente: '7713e292-abd1-42fc-b1f0-071b7e7a2f61',
      date_maj: new Date('2022-04-28'),
      services: Services([
        Service.MaterielInformatiqueAPrixSolidaire,
        Service.AideAuxDemarchesAdministratives,
        Service.MaitriseDesOutilsNumeriquesDuQuotidien,
        Service.InsertionProfessionnelleViaLeNumerique,
        Service.UtilisationSecuriseeDuNumerique,
        Service.ParentaliteEtEducationAvecLeNumerique,
        Service.LoisirsEtCreationsNumeriques,
        Service.ComprehensionDuMondeNumerique,
        Service.AccesInternetEtMaterielInformatique
      ]),
      dispositif_programmes_nationaux: DispositifProgrammesNationaux([
        DispositifProgrammeNational.AidantsConnect,
        DispositifProgrammeNational.BibliothequesNumeriqueDeReference,
        DispositifProgrammeNational.CertificationPIX,
        DispositifProgrammeNational.ConseillersNumeriques,
        DispositifProgrammeNational.EmmausConnect
      ]),
      formations_labels: FormationsLabels([FormationLabel.ArniaMednum, FormationLabel.Ordi3]),
      autres_formations_labels: ['Nièvre médiation numérique'],
      accessibilite: Url(
        'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
      )
    };

    expect(toSchemaStructuresDataInclusion([lieuMediationNumerique])).toStrictEqual<SchemaStructureDataInclusion[]>([
      {
        id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
        siret: '60487647500499',
        nom: 'MOBILETTE',
        commune: 'Robinboeuf',
        code_postal: '09891',
        code_insee: '09890',
        adresse: '3 RUE DE LECLERCQ',
        date_maj: '2022-04-28T00:00:00.000Z',
        complement_adresse: 'HOTEL DE VILLE',
        longitude: 7.848133,
        latitude: 48.7703,
        typologie: Typologie.ASSO,
        telephone: '0102030405',
        courriel: 'julie@example.net',
        site_web: 'https://www.asso-gonzalez.net/',
        presentation_resume:
          'L’association Mobilette propose des solutions de déplacement aux personnes pour qui la non-mobilité est un frein à l’insertion professionnelle, nous sommes spécialisés dans la mobilité en milieu rurale, mais nous pouvons également proposer un accompagnement pour la mobilité en...',
        presentation_detail:
          "connaissance de l'offre de transport du territoire / accès à un véhicule 2 ou 4 roues / transport solidaire / accès au permis",
        source: 'solidagregateur',
        structure_parente: '7713e292-abd1-42fc-b1f0-071b7e7a2f61',
        horaires_ouverture: 'Mo-Fr 10:00-20:00 "sur rendez-vous"; PH off',
        accessibilite:
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
        labels_nationaux: ['aidants-connect', 'conseiller-numerique', 'arnia', 'ordi-3'],
        labels_autres: ['Nièvre médiation numérique'],
        thematiques: [
          'numerique',
          'numerique--s-equiper-en-materiel-informatique',
          'numerique--realiser-des-demarches-administratives-avec-un-accompagnement',
          'numerique--devenir-autonome-dans-les-demarches-administratives',
          'numerique--accompagner-les-demarches-de-sante',
          'numerique--prendre-en-main-un-smartphone-ou-une-tablette',
          'numerique--prendre-en-main-un-ordinateur',
          'numerique--utiliser-le-numerique-au-quotidien',
          'numerique--favoriser-mon-insertion-professionnelle',
          'numerique--creer-et-developper-mon-entreprise',
          'numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique',
          'numerique--creer-avec-le-numerique',
          'numerique--approfondir-ma-culture-numerique',
          'numerique--promouvoir-la-citoyennete-numerique',
          'numerique--acceder-a-une-connexion-internet',
          'numerique--acceder-a-du-materiel'
        ]
      }
    ]);
  });

  it('should convert minimal lieux de mediation numerique model to data.inclusion service schema', (): void => {
    const minimalLieuMediationNumerique: LieuMediationNumerique = {
      id: Id('c3d15659-8de9-4fd6-b283-04d50f6ace57'),
      nom: Nom('MOBILETTE'),
      pivot: Pivot('60487647500499'),
      adresse: Adresse({
        code_postal: '09891',
        commune: 'Robinboeuf',
        voie: '3 RUE DE LECLERCQ'
      }),
      services: Services([Service.AccesInternetEtMaterielInformatique]),
      date_maj: new Date('2022-04-28'),
      source: 'solidagregateur'
    };

    expect(toSchemaServicesDataInclusion([minimalLieuMediationNumerique])).toStrictEqual<SchemaServiceDataInclusion[]>([
      {
        id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57-mediation-numerique',
        structure_id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
        source: 'solidagregateur',
        nom: 'Médiation numérique',
        thematiques: ['numerique', 'numerique--acceder-a-une-connexion-internet', 'numerique--acceder-a-du-materiel']
      }
    ]);
  });

  it('should convert full lieux de mediation numerique model to data.inclusion service schema', (): void => {
    const lieuMediationNumerique: LieuMediationNumerique = {
      id: Id('c3d15659-8de9-4fd6-b283-04d50f6ace57'),
      pivot: Pivot('60487647500499'),
      nom: Nom('MOBILETTE'),
      adresse: Adresse({
        code_postal: '09891',
        commune: 'Robinboeuf',
        voie: '3 RUE DE LECLERCQ'
      }),
      localisation: Localisation({
        latitude: 48.7703,
        longitude: 7.848133
      }),
      // typologies: Typologies([Typologie.ASSO]),
      services: Services([
        Service.MaterielInformatiqueAPrixSolidaire,
        Service.AideAuxDemarchesAdministratives,
        Service.MaitriseDesOutilsNumeriquesDuQuotidien,
        Service.InsertionProfessionnelleViaLeNumerique,
        Service.UtilisationSecuriseeDuNumerique,
        Service.ParentaliteEtEducationAvecLeNumerique,
        Service.LoisirsEtCreationsNumeriques,
        Service.ComprehensionDuMondeNumerique,
        Service.AccesInternetEtMaterielInformatique
      ]),
      date_maj: new Date('2022-04-28'),
      source: 'solidagregateur',
      modalites_accompagnement: ModalitesAccompagnement([
        ModaliteAccompagnement.ADistance,
        ModaliteAccompagnement.EnAutonomie,
        ModaliteAccompagnement.AccompagnementIndividuel,
        ModaliteAccompagnement.DansUnAtelier
      ]),
      frais_a_charge: FraisACharge([Frais.Payant, Frais.GratuitSousCondition]),
      prise_rdv: Url('https://www.rdv-solidarites.fr/'),
      publics_specifiquement_adresses: PublicsSpecifiquementAdresses([
        PublicSpecifiquementAdresse.Jeunes,
        PublicSpecifiquementAdresse.Etudiants,
        PublicSpecifiquementAdresse.FamillesEnfants,
        PublicSpecifiquementAdresse.Seniors,
        PublicSpecifiquementAdresse.Femmes
      ]),
      prise_en_charge_specifique: PrisesEnChargeSpecifiques([
        PriseEnChargeSpecifique.Surdite,
        PriseEnChargeSpecifique.HandicapsMoteurs,
        PriseEnChargeSpecifique.HandicapsMentaux,
        PriseEnChargeSpecifique.Illettrisme,
        PriseEnChargeSpecifique.LanguesEtrangeresAnglais,
        PriseEnChargeSpecifique.LanguesEtrangeresAutre,
        PriseEnChargeSpecifique.DeficienceVisuelle
      ]),
      modalites_acces: ModalitesAcces([
        ModaliteAcces.SePresenter,
        ModaliteAcces.Telephoner,
        ModaliteAcces.ContacterParMail,
        ModaliteAcces.PrescriptionParMail,
        ModaliteAcces.PrendreRdvEnLigne
      ])
    };

    expect(toSchemaServicesDataInclusion([lieuMediationNumerique])).toStrictEqual<SchemaServiceDataInclusion[]>([
      {
        id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57-mediation-numerique',
        structure_id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
        source: 'solidagregateur',
        nom: 'Médiation numérique',
        types: ['autonomie', 'accompagnement', 'atelier'],
        modes_accueil: ['a-distance', 'en-presentiel'],
        thematiques: [
          'numerique',
          'numerique--s-equiper-en-materiel-informatique',
          'numerique--realiser-des-demarches-administratives-avec-un-accompagnement',
          'numerique--devenir-autonome-dans-les-demarches-administratives',
          'numerique--accompagner-les-demarches-de-sante',
          'numerique--prendre-en-main-un-smartphone-ou-une-tablette',
          'numerique--prendre-en-main-un-ordinateur',
          'numerique--utiliser-le-numerique-au-quotidien',
          'numerique--favoriser-mon-insertion-professionnelle',
          'numerique--creer-et-developper-mon-entreprise',
          'numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique',
          'numerique--creer-avec-le-numerique',
          'numerique--approfondir-ma-culture-numerique',
          'numerique--promouvoir-la-citoyennete-numerique',
          'numerique--acceder-a-une-connexion-internet',
          'numerique--acceder-a-du-materiel'
        ],
        prise_rdv: 'https://www.rdv-solidarites.fr/',
        frais: ['payant'],
        profils: [
          'surdite',
          'handicaps-mentaux',
          'personnes-en-situation-illettrisme',
          'public-langues-etrangeres',
          'deficience-visuelle',
          'jeunes-16-26',
          'familles-enfants',
          'seniors-65',
          'femmes'
        ],
        modes_orientation_accompagnateur: ['telephoner', 'envoyer-un-mail', 'envoyer-un-mail-avec-une-fiche-de-prescription'],
        modes_orientation_beneficiaire: ['se-presenter', 'telephoner', 'envoyer-un-mail']
      }
    ]);
  });

  it("should have mode d'accueil a-distance only when modalité accompagnement is à distance", (): void => {
    const minimalLieuMediationNumerique: LieuMediationNumerique = {
      id: Id('c3d15659-8de9-4fd6-b283-04d50f6ace57'),
      nom: Nom('MOBILETTE'),
      pivot: Pivot('60487647500499'),
      adresse: Adresse({
        code_postal: '09891',
        commune: 'Robinboeuf',
        voie: '3 RUE DE LECLERCQ'
      }),
      services: Services([Service.AccesInternetEtMaterielInformatique]),
      date_maj: new Date('2022-04-28'),
      source: 'solidagregateur',
      modalites_accompagnement: ModalitesAccompagnement([ModaliteAccompagnement.ADistance])
    };

    expect(toSchemaServicesDataInclusion([minimalLieuMediationNumerique])).toStrictEqual<SchemaServiceDataInclusion[]>([
      {
        id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57-mediation-numerique',
        structure_id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
        source: 'solidagregateur',
        nom: 'Médiation numérique',
        thematiques: ['numerique', 'numerique--acceder-a-une-connexion-internet', 'numerique--acceder-a-du-materiel'],
        modes_accueil: ['a-distance']
      }
    ]);
  });

  it("should have mode d'accueil en-presentiel only when modalité accompagnement is present and not à distance", (): void => {
    const minimalLieuMediationNumerique: LieuMediationNumerique = {
      id: Id('c3d15659-8de9-4fd6-b283-04d50f6ace57'),
      nom: Nom('MOBILETTE'),
      pivot: Pivot('60487647500499'),
      adresse: Adresse({
        code_postal: '09891',
        commune: 'Robinboeuf',
        voie: '3 RUE DE LECLERCQ'
      }),
      services: Services([Service.AccesInternetEtMaterielInformatique]),
      date_maj: new Date('2022-04-28'),
      source: 'solidagregateur',
      modalites_accompagnement: ModalitesAccompagnement([ModaliteAccompagnement.EnAutonomie])
    };

    expect(toSchemaServicesDataInclusion([minimalLieuMediationNumerique])).toStrictEqual<SchemaServiceDataInclusion[]>([
      {
        id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57-mediation-numerique',
        structure_id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
        source: 'solidagregateur',
        nom: 'Médiation numérique',
        thematiques: ['numerique', 'numerique--acceder-a-une-connexion-internet', 'numerique--acceder-a-du-materiel'],
        types: ['autonomie'],
        modes_accueil: ['en-presentiel']
      }
    ]);
  });
});
