import { z } from 'zod';
import {
  Adresse,
  Contact,
  FicheAccesLibre,
  FormationsLabels,
  FraisACharge,
  Horaires,
  Id,
  Itinerances,
  Localisation,
  ModalitesAcces,
  ModalitesAccompagnement,
  Nom,
  Pivot,
  Presentation,
  PrisesEnChargeSpecifiques,
  PublicsSpecifiquementAdresses,
  Services,
  Typologies,
  Url,
  DispositifProgrammesNationaux
} from '../../models';

/**
 * Un assemblage parmi d'autres possibles : ce que la cartographie nationale exige d'un lieu
 * pour l'afficher. Il ne redit aucune règle de champ — il compose les schémas des modèles —
 * et n'ajoute que ses propres exigences, celles qui tiennent à l'usage et non à la donnée.
 *
 * Ici, une seule : **au moins un service**. Elle vit dans l'assemblage et non dans le socle,
 * sans quoi la coop ne pourrait pas composer les mêmes briques sans renier sa base, qui
 * autorise la liste vide et ne filtre qu'à la publication (D29.3).
 */
export const LieuPourLaCartographieSchema = z.object({
  id: Id.schema,
  nom: Nom.schema,
  pivot: Pivot.schema.optional(),
  adresse: Adresse.schema,
  localisation: Localisation.schema,
  services: Services.schema.refine((services: readonly unknown[]): boolean => services.length > 0, {
    error: 'Un lieu doit annoncer au moins un service'
  }),
  date_maj: z.date().optional(),
  source: z.string().optional(),
  horaires: Horaires.schema.optional(),
  presentation: Presentation.schema.optional(),
  contact: Contact.schema.optional(),
  typologies: Typologies.schema.optional(),
  publics_specifiquement_adresses: PublicsSpecifiquementAdresses.schema.optional(),
  prise_en_charge_specifique: PrisesEnChargeSpecifiques.schema.optional(),
  modalites_acces: ModalitesAcces.schema.optional(),
  frais_a_charge: FraisACharge.schema.optional(),
  itinerance: Itinerances.schema.optional(),
  dispositif_programmes_nationaux: DispositifProgrammesNationaux.schema.optional(),
  formations_labels: FormationsLabels.schema.optional(),
  autres_formations_labels: z.array(z.string()).optional(),
  modalites_accompagnement: ModalitesAccompagnement.schema.optional(),
  fiche_acces_libre: FicheAccesLibre.schema.optional(),
  prise_rdv: Url.schema.optional()
});

export type LieuPourLaCartographie = z.output<typeof LieuPourLaCartographieSchema>;
