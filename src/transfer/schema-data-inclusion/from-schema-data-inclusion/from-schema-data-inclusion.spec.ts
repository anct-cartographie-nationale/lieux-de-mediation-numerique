/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  Adresse,
  ConditionAcces,
  ConditionsAcces,
  Contact,
  Courriel,
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
  ServicesError,
  Typologie,
  Typologies,
  Url
} from '../../../models';
import { SchemaServiceDataInclusion, SchemaStructureDataInclusion } from '../schema-data-inclusion';
import { fromSchemaDataInclusion } from './from-schema-data-inclusion';
import { MandatorySiretOrRnaError } from './errors/mandatory-siret-or-rna.error';

describe('from schema data inclusion', (): void => {
  it("should get a minimal lieu de mediation numerique form a minimal structure d'inclusion and a minimal service d'inclusion", (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      siret: '43493312300029'
    };

    const service: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: ['numerique--devenir-autonome-dans-les-demarches-administratives']
    };

    const minimalLieuMediationNumerique: LieuMediationNumerique = fromSchemaDataInclusion([service], structure);

    expect(minimalLieuMediationNumerique).toStrictEqual<LieuMediationNumerique>({
      id: Id('structure-1'),
      nom: Nom('Anonymal'),
      pivot: Pivot('43493312300029'),
      adresse: Adresse({
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ'
      }),
      services: Services([Service.DevenirAutonomeDansLesDemarchesAdministratives]),
      date_maj: new Date('2022-10-10')
    });
  });

  it("should get a complete lieu de mediation numerique form a complete structure d'inclusion and a complete service d'inclusion", (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      code_insee: '51454',
      complement_adresse: 'Le patio du bois de l’Aulne',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      siret: '43493312300029',
      source: 'Hubik',
      accessibilite: 'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
      courriel: 'contact@laquincaillerie.tl',
      telephone: '+33180059880',
      site_web: 'https://www.laquincaillerie.tl/;https://m.facebook.com/laquincaillerienumerique/',
      horaires_ouverture: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
      labels_nationaux: ['france-service', 'aptic'],
      labels_autres: ['SudLabs', 'Nièvre médiation numérique'],
      latitude: 43.52609,
      longitude: 5.41423,
      presentation_detail:
        'Notre parcours d’initiation permet l’acquisition de compétences numériques de base. Nous proposons également un accompagnement à destination des personnes déjà initiées qui souhaiteraient approfondir leurs connaissances. Du matériel informatique est en libre accès pour nos adhérents tous les après-midis. En plus de d’accueillir les personnes dans notre lieu en semaine (sur rendez-vous), nous assurons une permanence le samedi matin dans la médiathèque XX.',
      presentation_resume: 'Notre association propose des formations aux outils numériques à destination des personnes âgées.',
      structure_parente: 'Pôle emploi',
      typologie: Typologie.TIERS_LIEUX
    };

    const service: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: [
        'numerique',
        'numerique--devenir-autonome-dans-les-demarches-administratives',
        'numerique--realiser-des-demarches-administratives-avec-un-accompagnement',
        'numerique--prendre-en-main-un-smartphone-ou-une-tablette',
        'numerique--prendre-en-main-un-ordinateur',
        'numerique--utiliser-le-numerique-au-quotidien',
        'numerique--approfondir-ma-culture-numerique',
        'numerique--favoriser-mon-insertion-professionnelle',
        'numerique--acceder-a-une-connexion-internet',
        'numerique--acceder-a-du-materiel',
        'numerique--s-equiper-en-materiel-informatique',
        'numerique--creer-et-developper-mon-entreprise',
        'numerique--creer-avec-le-numerique',
        'numerique--accompagner-les-demarches-de-sante',
        'numerique--promouvoir-la-citoyennete-numerique',
        'numerique--soutenir-la-parentalite-et-l-education-avec-le-numerique'
      ],
      frais: ['gratuit-sous-conditions'],
      types: ['autonomie', 'delegation', 'accompagnement', 'atelier'],
      prise_rdv: 'https://www.rdv-solidarites.fr/',
      profils: [
        'seniors-65',
        'familles-enfants',
        'adultes',
        'jeunes-16-26',
        'public-langues-etrangeres',
        'deficience-visuelle',
        'surdite',
        'handicaps-psychiques',
        'handicaps-mentaux',
        'femmes',
        'personnes-en-situation-illettrisme'
      ]
    };

    const lieuMediationNumerique: LieuMediationNumerique = fromSchemaDataInclusion([service], structure);

    expect(lieuMediationNumerique).toStrictEqual<LieuMediationNumerique>({
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
        Service.AccederADuMateriel,
        Service.EquiperEnMaterielInformatique,
        Service.CreerEtDevelopperMonEntreprise,
        Service.CreerAvecLeNumerique,
        Service.AccompagnerLesDemarchesDeSante,
        Service.PromouvoirLaCitoyenneteNumerique,
        Service.SoutenirLaParentalite
      ]),
      date_maj: new Date('2022-10-10'),
      localisation: Localisation({
        latitude: 43.52609,
        longitude: 5.41423
      }),
      typologies: Typologies([Typologie.TIERS_LIEUX]),
      contact: Contact({
        telephone: '+33180059880',
        courriel: [Courriel('contact@laquincaillerie.tl')],
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
        PublicAccueilli.Seniors,
        PublicAccueilli.FamillesEnfants,
        PublicAccueilli.Adultes,
        PublicAccueilli.Jeunes,
        PublicAccueilli.LanguesEtrangeres,
        PublicAccueilli.DeficienceVisuelle,
        PublicAccueilli.Surdite,
        PublicAccueilli.HandicapsPsychiques,
        PublicAccueilli.HandicapsMentaux,
        PublicAccueilli.UniquementFemmes,
        PublicAccueilli.Illettrisme
      ]),
      conditions_acces: ConditionsAcces([ConditionAcces.GratuitSousCondition]),
      labels_nationaux: LabelsNationaux([LabelNational.FranceServices, LabelNational.APTIC]),
      labels_autres: ['SudLabs', 'Nièvre médiation numérique'],
      modalites_accompagnement: ModalitesAccompagnement([
        ModaliteAccompagnement.Seul,
        ModaliteAccompagnement.AMaPlace,
        ModaliteAccompagnement.AvecDeLAide,
        ModaliteAccompagnement.DansUnAtelier
      ]),
      accessibilite: Url(
        'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
      ),
      prise_rdv: Url('https://www.rdv-solidarites.fr/')
    });
  });

  it('should fail when there is no allowed thematiques in data inclusion service', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      siret: '43493312300029'
    };

    const service: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1'
    };

    expect((): void => {
      fromSchemaDataInclusion([service], structure);
    }).toThrow(new ServicesError('service indéfini'));
  });

  it('should fail when there is no siret or rna', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal'
    };

    const service: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1'
    };

    expect((): void => {
      fromSchemaDataInclusion([service], structure);
    }).toThrow(new MandatorySiretOrRnaError());
  });

  it('should use RNA instead of siret when available', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      rna: 'W9R2003255'
    };

    const service: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: ['numerique--devenir-autonome-dans-les-demarches-administratives']
    };

    const minimalLieuMediationNumerique: LieuMediationNumerique = fromSchemaDataInclusion([service], structure);

    expect(minimalLieuMediationNumerique).toStrictEqual<LieuMediationNumerique>({
      id: Id('structure-1'),
      nom: Nom('Anonymal'),
      pivot: Pivot('W9R2003255'),
      adresse: Adresse({
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ'
      }),
      services: Services([Service.DevenirAutonomeDansLesDemarchesAdministratives]),
      date_maj: new Date('2022-10-10')
    });
  });

  it('should geocoded insee code as default value', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      siret: '43493312300029',
      _di_geocodage_code_insee: '51105'
    };

    const service: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: ['numerique--devenir-autonome-dans-les-demarches-administratives']
    };

    const minimalLieuMediationNumerique: LieuMediationNumerique = fromSchemaDataInclusion([service], structure);

    expect(minimalLieuMediationNumerique).toStrictEqual<LieuMediationNumerique>({
      id: Id('structure-1'),
      nom: Nom('Anonymal'),
      pivot: Pivot('43493312300029'),
      adresse: Adresse({
        code_postal: '51100',
        code_insee: '51105',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ'
      }),
      services: Services([Service.DevenirAutonomeDansLesDemarchesAdministratives]),
      date_maj: new Date('2022-10-10')
    });
  });

  it('should fail when there is no service associated with the structure', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      rna: 'W9R2003255'
    };

    expect((): void => {
      fromSchemaDataInclusion([], structure);
    }).toThrow(new ServicesError('service indéfini'));
  });

  it('should merge two minimal services', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      rna: 'W9R2003255'
    };

    const service1: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: ['numerique--devenir-autonome-dans-les-demarches-administratives']
    };

    const service2: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: ['numerique--acceder-a-une-connexion-internet']
    };

    const minimalLieuMediationNumerique: LieuMediationNumerique = fromSchemaDataInclusion([service1, service2], structure);

    expect(minimalLieuMediationNumerique).toStrictEqual<LieuMediationNumerique>({
      id: Id('structure-1'),
      nom: Nom('Anonymal'),
      pivot: Pivot('W9R2003255'),
      adresse: Adresse({
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ'
      }),
      services: Services([Service.DevenirAutonomeDansLesDemarchesAdministratives, Service.AccederAUneConnexionInternet]),
      date_maj: new Date('2022-10-10')
    });
  });

  it('should merge two services with multiple values for frais', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      rna: 'W9R2003255'
    };

    const service1: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: ['numerique--devenir-autonome-dans-les-demarches-administratives'],
      frais: ['payant']
    };

    const service2: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: ['numerique--acceder-a-une-connexion-internet'],
      frais: ['gratuit']
    };

    const minimalLieuMediationNumerique: LieuMediationNumerique = fromSchemaDataInclusion([service1, service2], structure);

    expect(minimalLieuMediationNumerique).toStrictEqual<LieuMediationNumerique>({
      id: Id('structure-1'),
      nom: Nom('Anonymal'),
      pivot: Pivot('W9R2003255'),
      adresse: Adresse({
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ'
      }),
      services: Services([Service.DevenirAutonomeDansLesDemarchesAdministratives, Service.AccederAUneConnexionInternet]),
      date_maj: new Date('2022-10-10'),
      conditions_acces: ConditionsAcces([ConditionAcces.Payant, ConditionAcces.Gratuit])
    });
  });

  it("should merge two complete services d'inclusion", (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 BIS RUE DE LECLERCQ',
      code_postal: '51100',
      commune: 'Reims',
      date_maj: new Date('2022-10-10').toISOString(),
      id: 'structure-1',
      nom: 'Anonymal',
      siret: '43493312300029'
    };

    const service1: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: [
        'numerique',
        'numerique--devenir-autonome-dans-les-demarches-administratives',
        'numerique--realiser-des-demarches-administratives-avec-un-accompagnement',
        'numerique--prendre-en-main-un-smartphone-ou-une-tablette',
        'numerique--prendre-en-main-un-ordinateur'
      ],
      frais: ['adhesion'],
      types: ['accompagnement', 'atelier'],
      prise_rdv: 'https://www.rdv-solidarites.fr/service1',
      profils: ['seniors-65', 'familles-enfants', 'adultes', 'jeunes-16-26']
    };

    const service2: SchemaServiceDataInclusion = {
      id: 'structure-1-mediation-numerique',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      thematiques: ['numerique--prendre-en-main-un-ordinateur', 'numerique--prendre-en-main-un-smartphone-ou-une-tablette'],
      frais: ['pass-numerique'],
      types: ['delegation', 'accompagnement', 'atelier'],
      prise_rdv: 'https://www.rdv-solidarites.fr/service2',
      profils: ['seniors-65', 'adultes', 'jeunes-16-26']
    };

    const minimalLieuMediationNumerique: LieuMediationNumerique = fromSchemaDataInclusion([service1, service2], structure);

    expect(minimalLieuMediationNumerique).toStrictEqual<LieuMediationNumerique>({
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
        Service.PrendreEnMainUnOrdinateur
      ]),
      date_maj: new Date('2022-10-10'),
      publics_accueillis: PublicsAccueillis([
        PublicAccueilli.Seniors,
        PublicAccueilli.FamillesEnfants,
        PublicAccueilli.Adultes,
        PublicAccueilli.Jeunes
      ]),
      conditions_acces: ConditionsAcces([ConditionAcces.Adhesion, ConditionAcces.AccepteLePassNumerique]),
      modalites_accompagnement: ModalitesAccompagnement([
        ModaliteAccompagnement.AvecDeLAide,
        ModaliteAccompagnement.DansUnAtelier,
        ModaliteAccompagnement.AMaPlace
      ]),
      prise_rdv: Url('https://www.rdv-solidarites.fr/service2')
    });
  });
});
