/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  SchemaServiceDataInclusion,
  SchemaServiceDataInclusionWithAdresse,
  SchemaStructureDataInclusion
} from '../schema-data-inclusion';
import { isServiceWithAdresse, toStructureDataInclusion } from './service-to-structure';
import { Typologie } from '../../../models';

describe('service data inclusion to structure data inclusion', (): void => {
  it('should convert minimal service data inclusion to structure data inclusion', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 rue Baudricourt',
      code_postal: '75013',
      commune: 'Paris',
      date_maj: '2022-04-28T00:00:00.000Z',
      id: '456138a4-45ac-d8fa-d44a-fd45a5fd4948',
      nom: 'CCAS Paris 13',
      siret: '43493312300029'
    };

    const service: SchemaServiceDataInclusionWithAdresse = {
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      commune: 'Metz',
      code_postal: '57100',
      adresse: '4 rue des Acacia'
    };

    const structureFromService: SchemaStructureDataInclusion = toStructureDataInclusion(service, structure);

    expect(structureFromService).toStrictEqual<SchemaStructureDataInclusion>({
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
      nom: 'Médiation numérique',
      siret: '43493312300029',
      commune: 'Metz',
      code_postal: '57100',
      adresse: '4 rue des Acacia',
      date_maj: '2022-04-28T00:00:00.000Z',
      source: 'Hubik',
      structure_parente: 'structure-1'
    });
  });

  it('should convert maximal service data inclusion to structure data inclusion', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 rue Baudricourt',
      code_postal: '75013',
      commune: 'Paris',
      date_maj: '2022-04-28T00:00:00.000Z',
      id: '456138a4-45ac-d8fa-d44a-fd45a5fd4948',
      nom: 'CCAS Paris 13',
      siret: '43493312300029'
    };

    const service: SchemaServiceDataInclusionWithAdresse = {
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
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
      ],
      adresse: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '57260',
      commune: 'Metz',
      latitude: 43.52609,
      longitude: 5.41423,
      complement_adresse: 'Le patio du bois de l’Aulne',
      presentation_resume: 'Résumé de la présentation',
      presentation_detail: 'Détails de la présentation',
      date_maj: '2023-05-02T00:00:00.000Z',
      telephone: '0102030405',
      courriel: 'julie@example.net'
    };

    const structureFromService: SchemaStructureDataInclusion = toStructureDataInclusion(service, structure);

    expect(structureFromService).toStrictEqual<SchemaStructureDataInclusion>({
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
      nom: 'Médiation numérique',
      siret: '43493312300029',
      commune: 'Metz',
      code_postal: '57100',
      code_insee: '57260',
      adresse: '4 rue des Acacias',
      complement_adresse: 'Le patio du bois de l’Aulne',
      latitude: 43.52609,
      longitude: 5.41423,
      date_maj: '2023-05-02T00:00:00.000Z',
      source: 'Hubik',
      structure_parente: 'structure-1',
      presentation_resume: 'Résumé de la présentation',
      presentation_detail: 'Détails de la présentation',
      telephone: '0102030405',
      courriel: 'julie@example.net'
    });
  });

  it('should convert service data inclusion with address to structure data inclusion with maximal data', (): void => {
    const structure: SchemaStructureDataInclusion = {
      adresse: '12 rue Baudricourt',
      code_postal: '75013',
      code_insee: '51454',
      complement_adresse: 'Le patio du bois de l’Aulne',
      commune: 'Paris',
      date_maj: '2022-04-28T00:00:00.000Z',
      id: '456138a4-45ac-d8fa-d44a-fd45a5fd4948',
      nom: 'CCAS Paris 13',
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

    const service: SchemaServiceDataInclusionWithAdresse = {
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
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
      ],
      adresse: '4 rue des Acacias',
      code_postal: '57100',
      code_insee: '57260',
      commune: 'Metz',
      latitude: 43.52609,
      longitude: 5.41423,
      complement_adresse: 'Le patio du bois de l’Aulne',
      presentation_resume: 'Résumé de la présentation',
      presentation_detail: 'Détails de la présentation',
      date_maj: '2023-05-02T00:00:00.000Z',
      telephone: '0102030405',
      courriel: 'julie@example.net'
    };

    const structureFromService: SchemaStructureDataInclusion = toStructureDataInclusion(service, structure);

    expect(structureFromService).toStrictEqual<SchemaStructureDataInclusion>({
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
      nom: 'Médiation numérique',
      siret: '43493312300029',
      commune: 'Metz',
      code_postal: '57100',
      code_insee: '57260',
      adresse: '4 rue des Acacias',
      complement_adresse: 'Le patio du bois de l’Aulne',
      latitude: 43.52609,
      longitude: 5.41423,
      date_maj: '2023-05-02T00:00:00.000Z',
      source: 'Hubik',
      structure_parente: 'structure-1',
      presentation_resume: 'Résumé de la présentation',
      presentation_detail: 'Détails de la présentation',
      telephone: '0102030405',
      courriel: 'julie@example.net',
      site_web: 'https://www.laquincaillerie.tl/;https://m.facebook.com/laquincaillerienumerique/',
      labels_nationaux: ['france-service', 'aptic'],
      labels_autres: ['SudLabs', 'Nièvre médiation numérique'],
      accessibilite: 'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
      horaires_ouverture: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
      typologie: Typologie.TIERS_LIEUX
    });
  });

  it('should check that it is not a service with address', (): void => {
    const service: SchemaServiceDataInclusion = {
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1'
    };

    expect(isServiceWithAdresse(service)).toBe(false);
  });

  it('should check that it is a service with address', (): void => {
    const service: SchemaServiceDataInclusionWithAdresse = {
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
      nom: 'Médiation numérique',
      source: 'Hubik',
      structure_id: 'structure-1',
      commune: 'Metz',
      code_postal: '57100',
      adresse: '4 rue des Acacia'
    };

    expect(isServiceWithAdresse(service)).toBe(true);
  });
});
