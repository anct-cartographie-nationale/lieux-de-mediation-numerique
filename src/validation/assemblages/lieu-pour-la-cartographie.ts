import { z } from 'zod';
import {
  DispositifProgrammeNational,
  FormationLabel,
  Frais,
  Itinerance,
  ModaliteAcces,
  ModaliteAccompagnement,
  PriseEnChargeSpecifique,
  PublicSpecifiquementAdresse,
  Service,
  Typologie
} from '../../models';
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

export const LieuPourLaCartographieSchema = z.object({
  id: IdSchema,
  nom: NomSchema,
  pivot: PivotSchema.optional(),
  adresse: AdresseSchema,
  localisation: LocalisationSchema,
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
