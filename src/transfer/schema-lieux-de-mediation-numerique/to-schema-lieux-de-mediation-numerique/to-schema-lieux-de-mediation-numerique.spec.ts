/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  Adresse,
  CleBan,
  ConditionAcces,
  ConditionsAcces,
  Contact,
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
import { toSchemaLieuxDeMediationNumerique } from './to-schema-lieux-de-mediation-numerique';

describe('to schema lieux de mediation numerique', (): void => {
  it('should convert minimal lieux de mediation numerique model to schema lieux mediation numérique', (): void => {
    const minimalLieuMediationNumerique: LieuMediationNumerique = {
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
    };

    expect(toSchemaLieuxDeMediationNumerique([minimalLieuMediationNumerique])).toStrictEqual<SchemaLieuMediationNumerique[]>([
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
    ]);
  });

  it('should convert full lieux de mediation numerique model to schema lieux mediation numérique', (): void => {
    const lieuMediationNumerique: LieuMediationNumerique = {
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
      autres_formations_et_labels: ['SudLabs', 'Nièvre médiation numérique'],
      modalites_accompagnement: ModalitesAccompagnement([ModaliteAccompagnement.Seul, ModaliteAccompagnement.AvecDeLAide]),
      accessibilite: Url(
        'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
      ),
      prise_rdv: Url('https://www.rdv-solidarites.fr/'),
      cle_ban: CleBan('13001_3079_00001')
    };

    expect(toSchemaLieuxDeMediationNumerique([lieuMediationNumerique])).toStrictEqual<SchemaLieuMediationNumerique[]>([
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
        autres_formations_et_labels: 'SudLabs;Nièvre médiation numérique',
        modalites_accompagnement:
          "Seul : j'ai accès à du matériel et une connexion;Avec de l'aide : je suis accompagné seul dans l'usage du numérique",
        accessibilite:
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
        prise_rdv: 'https://www.rdv-solidarites.fr/',
        cle_ban: '13001_3079_00001'
      }
    ]);
  });

  it('should convert lieu with sring date maj to schema lieux mediation numérique', (): void => {
    const minimalLieuMediationNumerique: LieuMediationNumerique = {
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
      date_maj: '2022-10-10T00:00:00.000Z' as unknown as Date
    };

    expect(toSchemaLieuxDeMediationNumerique([minimalLieuMediationNumerique])).toStrictEqual<SchemaLieuMediationNumerique[]>([
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
    ]);
  });

  it('should not get arrondissement insee code when city is not Lyon, Marseille or Paris', (): void => {
    const lieuMediationNumeriqueNotInABigCity: LieuMediationNumerique = {
      id: Id('structure-1'),
      nom: Nom('Anonymal'),
      pivot: Pivot('43493312300029'),
      adresse: Adresse({
        code_postal: '51100',
        code_insee: '51454',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ'
      }),
      services: Services([Service.AccederADuMateriel]),
      date_maj: new Date('2022-10-10')
    };

    expect(toSchemaLieuxDeMediationNumerique([lieuMediationNumeriqueNotInABigCity], true)).toStrictEqual<
      SchemaLieuMediationNumerique[]
    >([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        pivot: '43493312300029',
        commune: 'Reims',
        code_postal: '51100',
        code_insee: '51454',
        adresse: '12 BIS RUE DE LECLERCQ',
        services: Service.AccederADuMateriel,
        date_maj: '2022-10-10'
      }
    ]);
  });

  it('should get arrondissement 69382 as insee code when city is Lyon and code postal is 69002', (): void => {
    const lieuMediationNumeriqueNotInABigCity: LieuMediationNumerique = {
      id: Id('structure-1'),
      nom: Nom('Médiation numérique Bellecour'),
      pivot: Pivot('43493312300029'),
      adresse: Adresse({
        code_postal: '69002',
        code_insee: '69123',
        commune: 'Lyon',
        voie: '23 place Bellecour'
      }),
      services: Services([Service.AccederADuMateriel]),
      date_maj: new Date('2022-10-10')
    };

    expect(toSchemaLieuxDeMediationNumerique([lieuMediationNumeriqueNotInABigCity], true)).toStrictEqual<
      SchemaLieuMediationNumerique[]
    >([
      {
        id: 'structure-1',
        nom: 'Médiation numérique Bellecour',
        pivot: '43493312300029',
        commune: 'Lyon',
        code_postal: '69002',
        code_insee: '69382',
        adresse: '23 place Bellecour',
        services: Service.AccederADuMateriel,
        date_maj: '2022-10-10'
      }
    ]);
  });

  it('should get arrondissement 69381 as insee code when city is Lyon and code postal is 69001', (): void => {
    const lieuMediationNumeriqueNotInABigCity: LieuMediationNumerique = {
      id: Id('structure-1'),
      nom: Nom('Médiation numérique St Jean'),
      pivot: Pivot('43493312300029'),
      adresse: Adresse({
        code_postal: '69001',
        code_insee: '69123',
        commune: 'Lyon',
        voie: '3 place St Jean'
      }),
      services: Services([Service.AccederADuMateriel]),
      date_maj: new Date('2022-10-10')
    };

    expect(toSchemaLieuxDeMediationNumerique([lieuMediationNumeriqueNotInABigCity], true)).toStrictEqual<
      SchemaLieuMediationNumerique[]
    >([
      {
        id: 'structure-1',
        nom: 'Médiation numérique St Jean',
        pivot: '43493312300029',
        commune: 'Lyon',
        code_postal: '69001',
        code_insee: '69381',
        adresse: '3 place St Jean',
        services: Service.AccederADuMateriel,
        date_maj: '2022-10-10'
      }
    ]);
  });

  it('should get arrondissement 75113 as insee code when city is Paris and code postal is 75013', (): void => {
    const lieuMediationNumeriqueNotInABigCity: LieuMediationNumerique = {
      id: Id('structure-1'),
      nom: Nom('Médiation numérique 13'),
      pivot: Pivot('43493312300029'),
      adresse: Adresse({
        code_postal: '75013',
        code_insee: '75056',
        commune: 'Paris',
        voie: '12 rue Beaudricourt'
      }),
      services: Services([Service.AccederADuMateriel]),
      date_maj: new Date('2022-10-10')
    };

    expect(toSchemaLieuxDeMediationNumerique([lieuMediationNumeriqueNotInABigCity], true)).toStrictEqual<
      SchemaLieuMediationNumerique[]
    >([
      {
        id: 'structure-1',
        nom: 'Médiation numérique 13',
        pivot: '43493312300029',
        commune: 'Paris',
        code_postal: '75013',
        code_insee: '75113',
        adresse: '12 rue Beaudricourt',
        services: Service.AccederADuMateriel,
        date_maj: '2022-10-10'
      }
    ]);
  });

  it('should get arrondissement 13202 as insee code when city is Marseille and code postal is 13002', (): void => {
    const lieuMediationNumeriqueNotInABigCity: LieuMediationNumerique = {
      id: Id('structure-1'),
      nom: Nom('Médiation numérique 13'),
      pivot: Pivot('43493312300029'),
      adresse: Adresse({
        code_postal: '13002',
        code_insee: '13055',
        commune: 'Marseille',
        voie: '12 rue du vieux Port'
      }),
      services: Services([Service.AccederADuMateriel]),
      date_maj: new Date('2022-10-10')
    };

    expect(toSchemaLieuxDeMediationNumerique([lieuMediationNumeriqueNotInABigCity], true)).toStrictEqual<
      SchemaLieuMediationNumerique[]
    >([
      {
        id: 'structure-1',
        nom: 'Médiation numérique 13',
        pivot: '43493312300029',
        commune: 'Marseille',
        code_postal: '13002',
        code_insee: '13202',
        adresse: '12 rue du vieux Port',
        services: Service.AccederADuMateriel,
        date_maj: '2022-10-10'
      }
    ]);
  });
});
