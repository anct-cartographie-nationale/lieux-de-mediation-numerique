import { Adresse } from './adresse';
import { FormationsLabels } from './formation-label';
import { PrisesEnChargeSpecifiques } from './prise-en-charge-specifique';
import { PublicsSpecifiquementAdresses } from './publics-specifiquement-adresses';
import { Typologies } from './typologie';
import { Localisation } from './localisation';
import { Contact } from './contact';
import { Presentation } from './presentation';
import { Services } from './service';
import { FraisACharge } from './frais-a-charge';
import { Itinerances } from './itinerance';
import { ModalitesAccompagnement } from './modalite-accompagnement';
import { ModalitesAcces } from './modalite-acces';
import { Url } from './url';
import { Pivot } from './pivot';
import { DispositifProgrammesNationaux } from './dispositif-programme-national';
import { Horaires } from './horaires';
import { Id } from './id';
import { Nom } from './nom';

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
