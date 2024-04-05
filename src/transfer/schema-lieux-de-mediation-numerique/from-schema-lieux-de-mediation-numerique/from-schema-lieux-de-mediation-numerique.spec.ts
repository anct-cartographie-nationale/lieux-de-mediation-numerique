/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  Adresse,
  CleBan,
  ConditionAcces,
  ConditionsAcces,
  Contact,
  FormationLabel,
  FormationsLabels,
  Id,
  LabelNational,
  LabelsNationaux,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement,
  Nom,
  Pivot,
  PublicAccueilli,
  PublicsAccueillis,
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
        services:
          'Devenir autonome dans les démarches administratives;Réaliser des démarches administratives avec un accompagnement;Prendre en main un smartphone ou une tablette;Prendre en main un ordinateur;Utiliser le numérique au quotidien;Approfondir ma culture numérique;Favoriser mon insertion professionnelle;Accéder à une connexion internet;Accéder à du matériel',
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
        services: Services([
          Service.DevenirAutonomeDansLesDemarchesAdministratives,
          Service.RealiserDesDemarchesAdministratives,
          Service.PrendreEnMainUnSmartphoneOuUneTablette,
          Service.PrendreEnMainUnOrdinateur,
          Service.UtiliserLeNumerique,
          Service.ApprofondirMaCultureNumerique,
          Service.FavoriserMonInsertionProfessionnelle,
          Service.AccederAUneConnexionInternet,
          Service.AccederADuMateriel
        ]),
        date_maj: new Date('2022-10-10')
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
          'Devenir autonome dans les démarches administratives;Réaliser des démarches administratives avec un accompagnement;Prendre en main un smartphone ou une tablette;Prendre en main un ordinateur;Utiliser le numérique au quotidien;Approfondir ma culture numérique;Favoriser mon insertion professionnelle;Accéder à une connexion internet;Accéder à du matériel',
        date_maj: '2022-10-10',
        code_insee: '51454',
        complement_adresse: 'Le patio du bois de l’Aulne',
        latitude: 43.52609,
        longitude: 5.41423,
        typologie: 'TIERS_LIEUX',
        telephone: '+33180059880',
        courriel: 'contact@laquincaillerie.tl',
        site_web: 'https://www.laquincaillerie.tl/;https://m.facebook.com/laquincaillerienumerique/',
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        presentation_resume:
          'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
        presentation_detail:
          'Notre parcours d’initiation permet l’acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d’accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX.',
        source: 'Hubik',
        structure_parente: 'Pôle emploi',
        publics_accueillis: 'Familles/enfants;Adultes;Déficience visuelle',
        conditions_acces:
          "Payant : L'accès au lieu et/ou à ses services est payant;Accepte le Pass numérique : Il est possible d'utiliser un Pass numérique pour accéder au lieu",
        labels_nationaux: 'France Services;APTIC;Point relais CAF',
        labels_autres: 'SudLabs;Nièvre médiation numérique',
        formations_labels: 'Formé à « Mon Espace Santé »;SUD LABS (PACA)',
        modalites_accompagnement:
          "Seul : j'ai accès à du matériel et une connexion;Avec de l'aide : je suis accompagné seul dans l'usage du numérique",
        accessibilite:
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
        prise_rdv: 'https://www.rdv-solidarites.fr/',
        cle_ban: '13001_3079_00001'
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
          Service.DevenirAutonomeDansLesDemarchesAdministratives,
          Service.RealiserDesDemarchesAdministratives,
          Service.PrendreEnMainUnSmartphoneOuUneTablette,
          Service.PrendreEnMainUnOrdinateur,
          Service.UtiliserLeNumerique,
          Service.ApprofondirMaCultureNumerique,
          Service.FavoriserMonInsertionProfessionnelle,
          Service.AccederAUneConnexionInternet,
          Service.AccederADuMateriel
        ]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({
          latitude: 43.52609,
          longitude: 5.41423
        }),
        typologies: Typologies([Typologie.TIERS_LIEUX]),
        contact: Contact({
          telephone: '+33180059880',
          courriel: 'contact@laquincaillerie.tl',
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
        publics_accueillis: PublicsAccueillis([
          PublicAccueilli.FamillesEnfants,
          PublicAccueilli.Adultes,
          PublicAccueilli.DeficienceVisuelle
        ]),
        conditions_acces: ConditionsAcces([ConditionAcces.Payant, ConditionAcces.AccepteLePassNumerique]),
        labels_nationaux: LabelsNationaux([LabelNational.FranceServices, LabelNational.APTIC, LabelNational.PointRelaisCAF]),
        labels_autres: ['SudLabs', 'Nièvre médiation numérique'],
        formations_labels: FormationsLabels([FormationLabel.FormeAEspaceSante, FormationLabel.SudLabs]),
        modalites_accompagnement: ModalitesAccompagnement([ModaliteAccompagnement.Seul, ModaliteAccompagnement.AvecDeLAide]),
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        ),
        prise_rdv: Url('https://www.rdv-solidarites.fr/'),
        cle_ban: CleBan('13001_3079_00001')
      }
    ]);
  });
});
