/* eslint-disable @typescript-eslint/naming-convention, camelcase */

import { LieuMediationNumerique } from '../../../models';
import { SchemaLieuMediationNumerique } from '../schema-lieux-de-mediation-numerique';
import {
  accesFields,
  adresseFields,
  collecteFields,
  contactFields,
  disponibiliteFields,
  generalFields,
  labelsFields,
  localisationFields,
  presentationFields
} from './to-schema-lieux-de-mediation-numerique-fields';

type BigCity = {
  codeInsee: '13055' | '69123' | '75056';
  beginArrondissemntIndex: 3 | 4;
  arrondissementInseePrefix: '132' | '751' | '6938';
};

const bigCities: BigCity[] = [
  {
    codeInsee: '69123',
    beginArrondissemntIndex: 4,
    arrondissementInseePrefix: '6938'
  },
  {
    codeInsee: '13055',
    beginArrondissemntIndex: 3,
    arrondissementInseePrefix: '132'
  },
  {
    codeInsee: '75056',
    beginArrondissemntIndex: 3,
    arrondissementInseePrefix: '751'
  }
];

const isParisLyonOrMarseille = (lieuMediationNumerique: LieuMediationNumerique, bigCity: BigCity): boolean =>
  lieuMediationNumerique.adresse.code_insee === bigCity.codeInsee;

const getArrondissementCodeInsee = (bigCity: BigCity, lieuMediationNumerique: LieuMediationNumerique): string =>
  `${bigCity.arrondissementInseePrefix}${lieuMediationNumerique.adresse.code_postal.slice(bigCity.beginArrondissemntIndex, 5)}`;

const codeInseeForArrondissement = (lieuMediationNumerique: LieuMediationNumerique): string =>
  bigCities.reduce(
    (codeInsee: string, bigCity: BigCity): string =>
      isParisLyonOrMarseille(lieuMediationNumerique, bigCity)
        ? getArrondissementCodeInsee(bigCity, lieuMediationNumerique)
        : codeInsee,
    ''
  );

const arrondissementCodeInsee = (withArrondissement: boolean, codeInsee: string): { code_insee?: string } =>
  withArrondissement && codeInsee !== '' ? { code_insee: codeInsee } : {};

export const toSchemaLieuMediationNumerique = (
  lieuMediationNumerique: LieuMediationNumerique,
  withArrondissement: boolean = false
): SchemaLieuMediationNumerique => ({
  ...generalFields(lieuMediationNumerique),
  ...adresseFields(lieuMediationNumerique),
  ...localisationFields(lieuMediationNumerique),
  ...contactFields(lieuMediationNumerique),
  ...presentationFields(lieuMediationNumerique),
  ...accesFields(lieuMediationNumerique),
  ...labelsFields(lieuMediationNumerique),
  ...disponibiliteFields(lieuMediationNumerique),
  ...collecteFields(lieuMediationNumerique),
  ...arrondissementCodeInsee(withArrondissement, codeInseeForArrondissement(lieuMediationNumerique))
});

export const toSchemaLieuxDeMediationNumerique = (
  lieuxMediationNumerique: LieuMediationNumerique[],
  withArrondissement: boolean = false
): SchemaLieuMediationNumerique[] =>
  lieuxMediationNumerique.map(
    (lieuMediationNumerique: LieuMediationNumerique): SchemaLieuMediationNumerique =>
      toSchemaLieuMediationNumerique(lieuMediationNumerique, withArrondissement)
  );
