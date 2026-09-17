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
import type { Url } from './url';
import type { Pivot } from './pivot';
import type { DispositifProgrammesNationaux } from './dispositif-programme-national';
import type { Horaires } from './horaires';
import type { Id } from './id';
import type { Nom } from './nom';

export type LieuMediationNumerique = {
  id: Id;
  pivot?: Pivot;
  nom: Nom;
  adresse: Adresse;
  localisation?: Localisation;
  typologies?: Typologies;
  contact?: Contact;
  horaires?: Horaires;
  presentation?: Presentation;
  source?: string;
  /**
   * La date déclarée par le producteur. Facultative : 559 lieux du jeu national portaient
   * `1970-01-01`, le repli d'une transformation qui n'avait su lire aucun format — dont trois
   * sources entières. Une date illisible est une date absente, pas une date en 1970.
   */
  date_maj?: Date;
  services?: Services;
  publics_specifiquement_adresses?: PublicsSpecifiquementAdresses;
  prise_en_charge_specifique?: PrisesEnChargeSpecifiques;
  modalites_acces?: ModalitesAcces;
  frais_a_charge?: FraisACharge;
  itinerance?: Itinerances;
  dispositif_programmes_nationaux?: DispositifProgrammesNationaux;
  formations_labels?: FormationsLabels;
  autres_formations_labels?: string[];
  modalites_accompagnement?: ModalitesAccompagnement;
  fiche_acces_libre?: Url;
  prise_rdv?: Url;
};
