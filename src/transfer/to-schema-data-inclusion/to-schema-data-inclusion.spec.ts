/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import {
  Adresse,
  Contact,
  LabelNational,
  LabelsNationaux,
  LieuMediationNumerique,
  Localisation,
  Pivot,
  Service,
  Services,
  Typologie,
  Typologies,
  Url
} from '../../models';
import { SchemaStructureDataInclusion, toSchemaStructureDataInclusion } from './to-schema-data-inclusion';

describe('to schema data.inclusion', (): void => {
  it('should convert minimal lieux de mediation numerique model to data.inclusion structure schema', (): void => {
    const minimalLieuMediationNumerique: LieuMediationNumerique = {
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
      nom: 'MOBILETTE',
      pivot: Pivot('60487647500499'),
      adresse: Adresse({
        code_postal: '09891',
        commune: 'Robinboeuf',
        voie: '3 RUE DE LECLERCQ'
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
      date_maj: new Date('2022-04-28')
    };

    expect(toSchemaStructureDataInclusion([minimalLieuMediationNumerique])).toStrictEqual<SchemaStructureDataInclusion[]>([
      {
        id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
        siret: '60487647500499',
        nom: 'MOBILETTE',
        commune: 'Robinboeuf',
        code_postal: '09891',
        adresse: '3 RUE DE LECLERCQ',
        date_maj: '2022-04-28T00:00:00.000Z',
        thematiques: ['numérique']
      }
    ]);
  });

  it('should convert full lieux de mediation numerique model to data.inclusion structure schema', (): void => {
    const lieuMediationNumerique: LieuMediationNumerique = {
      id: 'c3d15659-8de9-4fd6-b283-04d50f6ace57',
      nom: 'MOBILETTE',
      pivot: Pivot('60487647500499'),
      adresse: Adresse({
        code_postal: '09891',
        commune: 'Robinboeuf',
        voie: '3 RUE DE LECLERCQ',
        code_insee: '09890',
        complement_adresse: 'HOTEL DE VILLE'
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
      date_maj: new Date('2022-04-28'),
      localisation: Localisation({
        latitude: 48.7703,
        longitude: 7.848133
      }),
      accessibilite: Url(
        'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
      ),
      contact: Contact({
        site_web: [Url('https://www.asso-gonzalez.net/'), Url('https://www.facebook.com/asso-gonzalez.net/')],
        telephone: '0102030405',
        courriel: 'julie@example.net'
      }),
      horaires: 'Mo-Fr 10:00-20:00 "sur rendez-vous"; PH off',
      presentation: {
        resumee:
          'L’association Mobilette propose des solutions de déplacement aux personnes pour qui la non mobilité est un frein à l’insertion professionnelle',
        detail:
          "connaissance de l'offre de transport du territoire / accès à un véhicule 2 ou 4 roues / transport solidaire / accès au permis"
      },
      labels_nationaux: LabelsNationaux([LabelNational.FranceServices, LabelNational.APTIC, LabelNational.PointRelaisCAF]),
      labels_autres: ['Nièvre médiation numérique'],
      source: 'solidagregateur',
      structure_parente: '7713e292-abd1-42fc-b1f0-071b7e7a2f61',
      typologies: Typologies([Typologie.ASSO])
    };

    expect(toSchemaStructureDataInclusion([lieuMediationNumerique])).toStrictEqual<SchemaStructureDataInclusion[]>([
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
          'L’association Mobilette propose des solutions de déplacement aux personnes pour qui la non mobilité est un frein à l’insertion professionnelle',
        presentation_detail:
          "connaissance de l'offre de transport du territoire / accès à un véhicule 2 ou 4 roues / transport solidaire / accès au permis",
        source: 'solidagregateur',
        structure_parente: '7713e292-abd1-42fc-b1f0-071b7e7a2f61',
        horaires_ouverture: 'Mo-Fr 10:00-20:00 "sur rendez-vous"; PH off',
        accessibilite:
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
        labels_nationaux: [LabelNational.FranceServices, LabelNational.APTIC, LabelNational.PointRelaisCAF],
        labels_autres: ['Nièvre médiation numérique'],
        thematiques: ['numérique']
      }
    ]);
  });
});
