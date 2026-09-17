import type { Adresse } from './adresse';
import type { FormationsLabels } from './formation-label';
import type { PrisesEnChargeSpecifiques } from './prise-en-charge-specifique';
import type { PublicsSpecifiquementAdresses } from './publics-specifiquement-adresses';
import type { Typologies } from './typologie';
import type { Localisation } from './localisation';
import type { Contact } from './contact';
import type { Presentation } from './presentation';
import type { Services } from './service';
import type { FraisACharge } from './frais-a-charge';
import type { Itinerances } from './itinerance';
import type { ModalitesAccompagnement } from './modalite-accompagnement';
import type { ModalitesAcces } from './modalite-acces';
import type { FicheAccesLibre } from './fiche-acces-libre';
import type { Url } from './url';
import type { Pivot } from './pivot';
import type { DispositifProgrammesNationaux } from './dispositif-programme-national';
import type { Horaires } from './horaires';
import type { Id } from './id';
import type { Nom } from './nom';

/**
 * Un lieu de médiation numérique, tel que le standard national le décrit.
 *
 * Les champs facultatifs admettent explicitement `undefined`. Avec
 * `exactOptionalPropertyTypes`, `pivot?: Pivot` et `pivot?: Pivot | undefined` ne sont pas la
 * même chose : le premier interdit d'écrire la clé avec `undefined` pour valeur, et refuse
 * donc ce que `.optional()` de zod produit. Sans cette écriture, la sortie d'un assemblage —
 * `LieuPourLaCartographie` — n'était pas assignable à ce type, et chaque consommateur qui
 * valide un lieu avant de le publier devait convertir à la main.
 *
 * `src/validation/validation.spec.ts` porte le contrôle qui vérifie que les deux formes
 * restent d'accord, et qui échoue sous `pnpm ts.check` si elles divergent.
 */
export type LieuMediationNumerique = {
  id: Id;
  pivot?: Pivot | undefined;
  nom: Nom;
  adresse: Adresse;
  localisation?: Localisation | undefined;
  typologies?: Typologies | undefined;
  contact?: Contact | undefined;
  horaires?: Horaires | undefined;
  presentation?: Presentation | undefined;
  source?: string | undefined;
  /**
   * La date déclarée par le producteur. Facultative : 559 lieux du jeu national portaient
   * `1970-01-01`, le repli d'une transformation qui n'avait su lire aucun format — dont trois
   * sources entières. Une date illisible est une date absente, pas une date en 1970.
   */
  date_maj?: Date | undefined;
  services?: Services | undefined;
  publics_specifiquement_adresses?: PublicsSpecifiquementAdresses | undefined;
  prise_en_charge_specifique?: PrisesEnChargeSpecifiques | undefined;
  modalites_acces?: ModalitesAcces | undefined;
  frais_a_charge?: FraisACharge | undefined;
  itinerance?: Itinerances | undefined;
  dispositif_programmes_nationaux?: DispositifProgrammesNationaux | undefined;
  formations_labels?: FormationsLabels | undefined;
  autres_formations_labels?: string[] | undefined;
  modalites_accompagnement?: ModalitesAccompagnement | undefined;
  fiche_acces_libre?: FicheAccesLibre | undefined;
  prise_rdv?: Url | undefined;
};
