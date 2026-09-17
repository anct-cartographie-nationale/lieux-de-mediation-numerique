import {
  dateMajSiLisible,
  Id,
  type LieuMediationNumerique,
  Nom,
  Pivot,
  type PrisesEnChargeSpecifiques,
  type PublicsSpecifiquementAdresses
} from '../../../models';
import type { SchemaServiceDataInclusion, SchemaStructureDataInclusion } from '../schema-data-inclusion';
import {
  accessibiliteFromDataInclusion,
  adresseFromDataInclusion,
  conditionsAccesFromDataInclusion,
  contactFromDataInclusion,
  horairesFromDataInclusion,
  labelsFromDataInclusion,
  localisationFromDataInclusion,
  mergeFrais,
  mergeModesAccueil,
  mergeModesOrientationAccompagnateur,
  mergeModesOrientationBeneficiaire,
  mergePriseRdv,
  mergeProfils,
  mergeThematiques,
  mergeTypes,
  modalitesAccesFromDataInclusion,
  modalitesAccompagnementFromDataInclusion,
  presentationFromDataInclusion,
  priseEnChargeSpecifiqueFromDataInclusion,
  priseRdvFromDataInclusion,
  publicSpecifiquementAdresseFromDataInclusion,
  servicesFromDataInclusion,
  sourceFromDataInclusion,
  TYPOLOGIES_MAP,
  typologiesFromDataInclusion
} from './from-schema-data-inclusion-fields';

const toSingleService = (
  mergedService: SchemaServiceDataInclusion,
  service: SchemaServiceDataInclusion
): SchemaServiceDataInclusion => ({
  ...mergedService,
  ...mergeThematiques(mergedService.thematiques, service.thematiques),
  ...mergeFrais(mergedService.frais, service.frais),
  ...mergeProfils(mergedService.profils, service.profils),
  ...mergeTypes(mergedService.types, service.types),
  ...mergeModesAccueil(mergedService.modes_accueil, service.modes_accueil),
  ...mergePriseRdv(mergedService.prise_rdv, service.prise_rdv),
  ...mergeModesOrientationBeneficiaire(mergedService.modes_orientation_beneficiaire, service.modes_orientation_beneficiaire),
  ...mergeModesOrientationAccompagnateur(
    mergedService.modes_orientation_accompagnateur,
    service.modes_orientation_accompagnateur
  )
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

const ifAnyPublicSpecifiquementAdresseInArray = (publicSpecifiquementAdresse: {
  publics_specifiquement_adresses?: PublicsSpecifiquementAdresses;
}): {
  publics_specifiquement_adresses?: PublicsSpecifiquementAdresses;
} => ((publicSpecifiquementAdresse.publics_specifiquement_adresses?.length ?? 0) > 0 ? publicSpecifiquementAdresse : {});

const ifAnyPriseEnChargeSpecifiqueInArray = (priseEnChargeSpecifique: {
  prise_en_charge_specifique?: PrisesEnChargeSpecifiques;
}): {
  prise_en_charge_specifique?: PrisesEnChargeSpecifiques;
} => ((priseEnChargeSpecifique.prise_en_charge_specifique?.length ?? 0) > 0 ? priseEnChargeSpecifique : {});

const fromSchemaDataInclusionItem = (
  structure: SchemaStructureDataInclusion,
  service: SchemaServiceDataInclusion
): LieuMediationNumerique => ({
  id: Id(structure.id),
  nom: Nom(structure.nom),

  ...(structure.siret == null ? {} : { pivot: Pivot(structure.siret) }),
  ...adresseFromDataInclusion(structure),
  ...localisationFromDataInclusion(structure.latitude, structure.longitude),
  ...servicesFromDataInclusion(service.thematiques),
  ...dateMajSiLisible(structure.date_maj),
  ...contactFromDataInclusion(structure.courriel, structure.telephone, structure.site_web),
  ...sourceFromDataInclusion(structure.source),
  ...accessibiliteFromDataInclusion(structure.accessibilite),
  ...conditionsAccesFromDataInclusion(service.frais),
  ...horairesFromDataInclusion(structure.horaires_ouverture),
  ...labelsFromDataInclusion(structure.labels_nationaux, structure.labels_autres),
  ...modalitesAccompagnementFromDataInclusion(service.types, service.modes_accueil),
  ...modalitesAccesFromDataInclusion(
    [...(service.modes_orientation_beneficiaire ?? []), ...(service.modes_orientation_accompagnateur ?? [])],
    priseRdvFromDataInclusion(service.prise_rdv)
  ),
  ...presentationFromDataInclusion(structure.presentation_detail, structure.presentation_resume),
  ...priseRdvFromDataInclusion(service.prise_rdv),
  ...ifAnyPublicSpecifiquementAdresseInArray(publicSpecifiquementAdresseFromDataInclusion(service.profils)),
  ...ifAnyPriseEnChargeSpecifiqueInArray(priseEnChargeSpecifiqueFromDataInclusion(service.profils)),
  ...(structure.typologie == null ? {} : typologiesFromDataInclusion(TYPOLOGIES_MAP.get(structure.typologie)))
});

export const fromSchemaDataInclusion = (
  services: SchemaServiceDataInclusion[],
  structure: SchemaStructureDataInclusion
): LieuMediationNumerique => fromSchemaDataInclusionItem(structure, mergeServices(services, structure));
