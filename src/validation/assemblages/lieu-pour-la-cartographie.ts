import { z } from 'zod';
import { DispositifProgrammeNational } from '../../models/dispositif-programme-national';
import { FormationLabel } from '../../models/formation-label';
import { Frais } from '../../models/frais-a-charge';
import { Itinerance } from '../../models/itinerance';
import { ModaliteAcces } from '../../models/modalite-acces';
import { ModaliteAccompagnement } from '../../models/modalite-accompagnement';
import { PriseEnChargeSpecifique } from '../../models/prise-en-charge-specifique';
import { PublicSpecifiquementAdresse } from '../../models/publics-specifiquement-adresses';
import { Service } from '../../models/service';
import { Typologie } from '../../models/typologie';
import {
  AdresseSchema,
  CourrielSchema,
  FicheAccesLibreSchema,
  HorairesSchema,
  IdSchema,
  LocalisationSchema,
  NomSchema,
  PivotSchema,
  PresentationSchema,
  TelephoneSchema,
  UrlSchema
} from '../champs';

const ContactSchema = z.object({
  telephone: TelephoneSchema.optional(),
  courriels: z.array(CourrielSchema).optional(),
  site_web: z.array(UrlSchema).optional()
});

/**
 * Le lieu tel que la **cartographie nationale** l'exige.
 *
 * C'est un **assemblage**, pas le socle. Les schémas de champ s'importent un à un et se
 * composent : un consommateur qui a d'autres besoins — la coop, dont la base admet un lieu
 * sans adresse et sans service — bâtit le sien à partir des mêmes briques, sans avoir à
 * relâcher celui-ci.
 *
 * On n'assouplit pas par extension : `.refine` et `.extend` ne savent que resserrer. C'est
 * pourquoi l'unité de composition est le champ, et non le lieu.
 */
export const LieuPourLaCartographieSchema = z.object({
  id: IdSchema,
  nom: NomSchema,
  pivot: PivotSchema.optional(),
  adresse: AdresseSchema,
  localisation: LocalisationSchema,
  /** Un lieu qui n'annonce aucun service n'oriente personne : la carte le retient. */
  services: z.array(z.enum(Service)).min(1, { error: 'Un lieu doit annoncer au moins un service' }),
  date_maj: z.date().optional(),
  source: z.string().optional(),
  horaires: HorairesSchema.optional(),
  presentation: PresentationSchema.optional(),
  contact: ContactSchema.optional(),
  typologies: z.array(z.enum(Typologie)).optional(),
  publics_specifiquement_adresses: z.array(z.enum(PublicSpecifiquementAdresse)).optional(),
  prise_en_charge_specifique: z.array(z.enum(PriseEnChargeSpecifique)).optional(),
  modalites_acces: z.array(z.enum(ModaliteAcces)).optional(),
  frais_a_charge: z.array(z.enum(Frais)).optional(),
  itinerance: z.array(z.enum(Itinerance)).optional(),
  dispositif_programmes_nationaux: z.array(z.enum(DispositifProgrammeNational)).optional(),
  formations_labels: z.array(z.enum(FormationLabel)).optional(),
  autres_formations_labels: z.array(z.string()).optional(),
  modalites_accompagnement: z.array(z.enum(ModaliteAccompagnement)).optional(),
  fiche_acces_libre: FicheAccesLibreSchema.optional(),
  prise_rdv: UrlSchema.optional()
});

export type LieuPourLaCartographie = z.output<typeof LieuPourLaCartographieSchema>;
