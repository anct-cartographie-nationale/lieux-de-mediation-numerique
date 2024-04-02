/* eslint-disable @typescript-eslint/naming-convention, camelcase, max-lines-per-function */

import { Id, LieuMediationNumerique, Nom, Pivot } from '../../../models';
import { SchemaServiceDataInclusion, SchemaStructureDataInclusion } from '../schema-data-inclusion';
import {
  accessibiliteFromDataInclusion,
  adresseFromDataInclusion,
  conditionsAccesFromDataInclusion,
  contactFromDataInclusion,
  horairesFromDataInclusion,
  labelsFromDataInclusion,
  localisationFromDataInclusion,
  mergeFrais,
  mergeModesOrientation,
  mergePriseRdv,
  mergeProfils,
  mergeThematiques,
  mergeTypes,
  modalitesAccesFromDataInclusion,
  modalitesAccompagnementFromDataInclusion,
  presentationFromDataInclusion,
  priseRdvFromDataInclusion,
  publicsAccueillisFromDataInclusion,
  servicesFromDataInclusion,
  sourceFromDataInclusion,
  structureParenteFromDataInclusion,
  TYPOLOGIES_MAP,
  typologiesFromDataInclusion
} from './from-schema-data-inclusion-fields';
import { MandatorySiretOrRnaError } from './errors/mandatory-siret-or-rna.error';

const toSingleService = (
  mergedService: SchemaServiceDataInclusion,
  service: SchemaServiceDataInclusion
): SchemaServiceDataInclusion => ({
  ...mergedService,
  ...mergeThematiques(mergedService.thematiques, service.thematiques),
  ...mergeFrais(mergedService.frais, service.frais),
  ...mergeProfils(mergedService.profils, service.profils),
  ...mergeTypes(mergedService.types, service.types),
  ...mergePriseRdv(mergedService.prise_rdv, service.prise_rdv),
  ...mergeModesOrientation(mergedService.modes_orientation, service.modes_orientation)
});

export const mergeServices = (
  services: SchemaServiceDataInclusion[],
  structure: SchemaStructureDataInclusion
): SchemaServiceDataInclusion =>
  services.reduce(toSingleService, {
    id: `${structure.id}-mediation-numerique`,
    nom: 'Médiation numérique',
    source: structure.source ?? '',
    structure_id: structure.id,
    thematiques: []
  });

const throwMandatorySiretOrRnaError = (): Pivot => {
  throw new MandatorySiretOrRnaError();
};

const fromSchemaDataInclusionItem = (
  structure: SchemaStructureDataInclusion,
  service: SchemaServiceDataInclusion
): LieuMediationNumerique => ({
  id: Id(structure.id),
  nom: Nom(structure.nom),
  pivot: Pivot(structure.siret ?? structure.rna ?? throwMandatorySiretOrRnaError()),
  ...adresseFromDataInclusion(structure),
  ...localisationFromDataInclusion(structure.latitude, structure.longitude),
  ...servicesFromDataInclusion(service.thematiques),
  date_maj: new Date(structure.date_maj),
  ...contactFromDataInclusion(structure.courriel, structure.telephone, structure.site_web),
  ...sourceFromDataInclusion(structure.source),
  ...accessibiliteFromDataInclusion(structure.accessibilite),
  ...conditionsAccesFromDataInclusion(service.frais),
  ...horairesFromDataInclusion(structure.horaires_ouverture),
  ...labelsFromDataInclusion(structure.labels_nationaux, structure.labels_autres),
  ...modalitesAccompagnementFromDataInclusion(service.types),
  ...modalitesAccesFromDataInclusion(service.modes_orientation, priseRdvFromDataInclusion(service.prise_rdv)),
  ...presentationFromDataInclusion(structure.presentation_detail, structure.presentation_resume),
  ...priseRdvFromDataInclusion(service.prise_rdv),
  ...publicsAccueillisFromDataInclusion(service.profils),
  ...structureParenteFromDataInclusion(structure.structure_parente),
  ...(structure.typologie == null ? {} : typologiesFromDataInclusion(TYPOLOGIES_MAP.get(structure.typologie)))
});

export const fromSchemaDataInclusion = (
  services: SchemaServiceDataInclusion[],
  structure: SchemaStructureDataInclusion
): LieuMediationNumerique => fromSchemaDataInclusionItem(structure, mergeServices(services, structure));
