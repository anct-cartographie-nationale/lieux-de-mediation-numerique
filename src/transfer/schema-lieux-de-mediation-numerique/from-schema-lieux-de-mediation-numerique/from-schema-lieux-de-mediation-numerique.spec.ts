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
  Itinerance,
  Itinerances,
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
import { SchemaLieuMediationNumerique } from '../schema-lieux-de-mediation-numerique';
import { fromSchemaLieuxDeMediationNumerique } from './from-schema-lieux-de-mediation-numerique';

describe('from schema lieux de mediation numerique', (): void => {
  it('should convert minimal schema lieux mediation numérique to lieux de mediation numerique model', (): void => {
    const minimalSchemaLieuMediationNumerique: SchemaLieuMediationNumerique[] = [
      {
        id: 'structure-1',
        nom: 'Anonymal',
        pivot: '43493312300029',
        commune: 'Reims',
        code_postal: '51100',
        adresse: '12 BIS RUE DE LECLERCQ',
        date_maj: '2022-10-10'
      }
    ];

    expect(fromSchemaLieuxDeMediationNumerique(minimalSchemaLieuMediationNumerique)).toStrictEqual<LieuMediationNumerique[]>([
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        date_maj: new Date('2022-10-10'),
        modalites_acces: ModalitesAcces([ModaliteAcces.PasDePublic])
      }
    ]);
  });

  it('should necer have "Pas de public" modalite access when there is at least one service', (): void => {
    const minimalSchemaLieuMediationNumerique: SchemaLieuMediationNumerique[] = [
      {
        id: 'structure-1',
        nom: 'Anonymal',
        pivot: '43493312300029',
        commune: 'Reims',
        code_postal: '51100',
        adresse: '12 BIS RUE DE LECLERCQ',
        date_maj: '2022-10-10',
        services: `${Service.LoisirsEtCreationsNumeriques}`,
        modalites_acces: [ModaliteAcces.SePresenter, ModaliteAcces.PasDePublic].join('|')
      }
    ];

    expect(fromSchemaLieuxDeMediationNumerique(minimalSchemaLieuMediationNumerique)).toStrictEqual<LieuMediationNumerique[]>([
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        date_maj: new Date('2022-10-10'),
        services: Services([Service.LoisirsEtCreationsNumeriques]),
        modalites_acces: ModalitesAcces([ModaliteAcces.SePresenter])
      }
    ]);
  });

  it('should convert full schema lieux mediation numérique to lieux de mediation numerique model', (): void => {
    const fullSchemaLieuMediationNumerique: SchemaLieuMediationNumerique[] = [
      {
        id: 'structure-1',
        nom: 'Anonymal',
        pivot: '43493312300029',
        commune: 'Reims',
        code_postal: '51100',
        adresse: '12 BIS RUE DE LECLERCQ',
        services:
          'Aide aux démarches administratives|Maîtrise des outils numériques du quotidien|Compréhension du monde numérique|Insertion professionnelle via le numérique|Accès internet et matériel informatique',
        date_maj: '2022-10-10',
        code_insee: '51454',
        complement_adresse: 'Le patio du bois de l’Aulne',
        latitude: 43.52609,
        longitude: 5.41423,
        typologie: 'TIERS_LIEUX',
        telephone: '+33180059880',
        courriels: ['contact@laquincaillerie.tl', 'hello@laquincaillerie.tl'].join('|'),
        site_web: 'https://www.laquincaillerie.tl/|https://m.facebook.com/laquincaillerienumerique/',
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        presentation_resume:
          'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
        presentation_detail:
          'Notre parcours d’initiation permet l’acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d’accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX.',
        source: 'Hubik',
        structure_parente: 'Pôle emploi',
        publics_specifiquement_adresses: [
          PublicSpecifiquementAdresse.Jeunes,
          PublicSpecifiquementAdresse.Etudiants,
          PublicSpecifiquementAdresse.FamillesEnfants,
          PublicSpecifiquementAdresse.Seniors,
          PublicSpecifiquementAdresse.Femmes
        ].join('|'),
        prise_en_charge_specifique: [
          PriseEnChargeSpecifique.Surdite,
          PriseEnChargeSpecifique.HandicapsMoteurs,
          PriseEnChargeSpecifique.HandicapsMentaux,
          PriseEnChargeSpecifique.Illettrisme,
          PriseEnChargeSpecifique.LanguesEtrangeresAnglais,
          PriseEnChargeSpecifique.LanguesEtrangeresAutre,
          PriseEnChargeSpecifique.DeficienceVisuelle
        ].join('|'),
        frais_a_charge: 'Payant|Gratuit sous condition',
        itinerance: 'Fixe|Itinérant',
        dispositif_programmes_nationaux: [
          DispositifProgrammeNational.FranceServices,
          DispositifProgrammeNational.AidantsConnect,
          DispositifProgrammeNational.ConseillersNumeriques
        ].join('|'),
        formations_labels: [FormationLabel.LesEclaireurs, FormationLabel.SudLabs].join('|'),
        autres_formations_labels: ['Numi formations', 'Nièvre médiation numérique'].join('|'),
        modalites_accompagnement: [ModaliteAccompagnement.AccompagnementIndividuel, ModaliteAccompagnement.EnAutonomie].join(
          '|'
        ),
        modalites_acces: [
          ModaliteAcces.SePresenter,
          ModaliteAcces.Telephoner,
          ModaliteAcces.ContacterParMail,
          ModaliteAcces.PrescriptionParMail,
          ModaliteAcces.PrendreRdvEnLigne
        ].join('|'),
        fiche_acces_libre:
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
        prise_rdv: 'https://www.rdv-solidarites.fr/'
      }
    ];

    expect(fromSchemaLieuxDeMediationNumerique(fullSchemaLieuMediationNumerique)).toStrictEqual<LieuMediationNumerique[]>([
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          code_insee: '51454',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: 'Le patio du bois de l’Aulne'
        }),
        services: Services([
          Service.AideAuxDemarchesAdministratives,
          Service.MaitriseDesOutilsNumeriquesDuQuotidien,
          Service.ComprehensionDuMondeNumerique,
          Service.InsertionProfessionnelleViaLeNumerique,
          Service.AccesInternetEtMaterielInformatique
        ]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({
          latitude: 43.52609,
          longitude: 5.41423
        }),
        typologies: Typologies([Typologie.TIERS_LIEUX]),
        contact: Contact({
          telephone: '+33180059880',
          courriels: [Courriel('contact@laquincaillerie.tl'), Courriel('hello@laquincaillerie.tl')],
          site_web: [Url('https://www.laquincaillerie.tl/'), Url('https://m.facebook.com/laquincaillerienumerique/')]
        }),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        presentation: {
          resume: 'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
          detail:
            'Notre parcours d’initiation permet l’acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d’accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX.'
        },
        source: 'Hubik',
        structure_parente: 'Pôle emploi',
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
        frais_a_charge: FraisACharge([Frais.Payant, Frais.GratuitSousCondition]),
        itinerance: Itinerances([Itinerance.Fixe, Itinerance.Itinerant]),
        dispositif_programmes_nationaux: DispositifProgrammesNationaux([
          DispositifProgrammeNational.FranceServices,
          DispositifProgrammeNational.AidantsConnect,
          DispositifProgrammeNational.ConseillersNumeriques
        ]),
        formations_labels: FormationsLabels([FormationLabel.LesEclaireurs, FormationLabel.SudLabs]),
        autres_formations_labels: ['Numi formations', 'Nièvre médiation numérique'],
        modalites_accompagnement: ModalitesAccompagnement([
          ModaliteAccompagnement.AccompagnementIndividuel,
          ModaliteAccompagnement.EnAutonomie
        ]),
        modalites_acces: ModalitesAcces([
          ModaliteAcces.SePresenter,
          ModaliteAcces.Telephoner,
          ModaliteAcces.ContacterParMail,
          ModaliteAcces.PrescriptionParMail,
          ModaliteAcces.PrendreRdvEnLigne
        ]),
        fiche_acces_libre: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        ),
        prise_rdv: Url('https://www.rdv-solidarites.fr/')
      }
    ]);
  });

  it('should convert full schema lieux mediation numérique without services to lieux de mediation numerique model', (): void => {
    const fullSchemaLieuMediationNumerique: SchemaLieuMediationNumerique[] = [
      {
        id: 'structure-1',
        nom: 'Anonymal',
        pivot: '43493312300029',
        commune: 'Reims',
        code_postal: '51100',
        adresse: '12 BIS RUE DE LECLERCQ',
        date_maj: '2022-10-10',
        code_insee: '51454',
        complement_adresse: 'Le patio du bois de l’Aulne',
        latitude: 43.52609,
        longitude: 5.41423,
        typologie: 'TIERS_LIEUX',
        telephone: '+33180059880',
        courriels: ['contact@laquincaillerie.tl', 'hello@laquincaillerie.tl'].join('|'),
        site_web: 'https://www.laquincaillerie.tl/|https://m.facebook.com/laquincaillerienumerique/',
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        presentation_resume:
          'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
        presentation_detail:
          'Notre parcours d’initiation permet l’acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d’accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX.',
        source: 'Hubik',
        structure_parente: 'Pôle emploi',
        publics_specifiquement_adresses: [
          PublicSpecifiquementAdresse.Jeunes,
          PublicSpecifiquementAdresse.Etudiants,
          PublicSpecifiquementAdresse.FamillesEnfants,
          PublicSpecifiquementAdresse.Seniors,
          PublicSpecifiquementAdresse.Femmes
        ].join('|'),
        prise_en_charge_specifique: [
          PriseEnChargeSpecifique.Surdite,
          PriseEnChargeSpecifique.HandicapsMoteurs,
          PriseEnChargeSpecifique.HandicapsMentaux,
          PriseEnChargeSpecifique.Illettrisme,
          PriseEnChargeSpecifique.LanguesEtrangeresAnglais,
          PriseEnChargeSpecifique.LanguesEtrangeresAutre,
          PriseEnChargeSpecifique.DeficienceVisuelle
        ].join('|'),
        frais_a_charge:
          "Payant : L'accès au lieu et/ou à ses services est payant|Gratuit sous condition : La gratuité est conditionnée à des critères (situation familiale, convention avec un organisme social...)",
        itinerance: 'Fixe|Itinérant',
        dispositif_programmes_nationaux: [
          DispositifProgrammeNational.FranceServices,
          DispositifProgrammeNational.AidantsConnect,
          DispositifProgrammeNational.ConseillersNumeriques
        ].join('|'),
        formations_labels: [FormationLabel.SudLabs, FormationLabel.MesPapiers].join('|'),
        autres_formations_labels: ['Numi formations', 'Nièvre médiation numérique'].join('|'),
        modalites_accompagnement: [ModaliteAccompagnement.AccompagnementIndividuel, ModaliteAccompagnement.EnAutonomie].join(
          '|'
        ),
        modalites_acces: [
          ModaliteAcces.SePresenter,
          ModaliteAcces.Telephoner,
          ModaliteAcces.ContacterParMail,
          ModaliteAcces.PrescriptionParMail,
          ModaliteAcces.PrendreRdvEnLigne
        ].join('|'),
        fiche_acces_libre:
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
        prise_rdv: 'https://www.rdv-solidarites.fr/'
      }
    ];

    expect(fromSchemaLieuxDeMediationNumerique(fullSchemaLieuMediationNumerique)).toStrictEqual<LieuMediationNumerique[]>([
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          code_insee: '51454',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ',
          complement_adresse: 'Le patio du bois de l’Aulne'
        }),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({
          latitude: 43.52609,
          longitude: 5.41423
        }),
        typologies: Typologies([Typologie.TIERS_LIEUX]),
        contact: Contact({
          telephone: '+33180059880',
          courriels: [Courriel('contact@laquincaillerie.tl'), Courriel('hello@laquincaillerie.tl')],
          site_web: [Url('https://www.laquincaillerie.tl/'), Url('https://m.facebook.com/laquincaillerienumerique/')]
        }),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        presentation: {
          resume: 'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
          detail:
            'Notre parcours d’initiation permet l’acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d’accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX.'
        },
        source: 'Hubik',
        structure_parente: 'Pôle emploi',
        dispositif_programmes_nationaux: DispositifProgrammesNationaux([
          DispositifProgrammeNational.FranceServices,
          DispositifProgrammeNational.AidantsConnect,
          DispositifProgrammeNational.ConseillersNumeriques
        ]),
        formations_labels: FormationsLabels([FormationLabel.SudLabs, FormationLabel.MesPapiers]),
        autres_formations_labels: ['Numi formations', 'Nièvre médiation numérique'],
        modalites_acces: ModalitesAcces([ModaliteAcces.PasDePublic]),
        fiche_acces_libre: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        ),
        prise_rdv: Url('https://www.rdv-solidarites.fr/')
      }
    ]);
  });
});
