/* eslint-disable @typescript-eslint/naming-convention */

import { Adresse } from './adresse';
import { Typologies } from './typologie';
import { Localisation } from './localisation';
import { Contact } from './contact';
/* eslint-disable-next-line @typescript-eslint/no-shadow */
import { Presentation } from './presentation';
import { Services } from './service';
import { PublicsAccueillis } from './public-accueilli';
import { ConditionsAcces } from './condition-acces';
import { ModalitesAccompagnement } from './modalite-accompagnement';
import { Url } from './url';
import { Pivot } from './pivot';
import { CleBan } from './cle-ban';
import { DispositifsProgrammesNationaux } from './dispositifs-programmes-nationaux';
import { Id } from './id';
import { Nom } from './nom';

export type LieuMediationNumerique = {
  id: Id;
  pivot: Pivot;
  nom: Nom;
  adresse: Adresse;
  localisation?: Localisation;
  cle_ban?: CleBan;
  typologies?: Typologies;
  contact?: Contact;
  horaires?: string;
  presentation?: Presentation;
  source?: string;
  structure_parente?: string;
  date_maj: Date;
  services: Services;
  publics_accueillis?: PublicsAccueillis;
  conditions_acces?: ConditionsAcces;
  dispositifs_programmes_nationaux?: DispositifsProgrammesNationaux;
  labels_autres?: string[];
  modalites_accompagnement?: ModalitesAccompagnement;
  accessibilite?: Url;
  prise_rdv?: Url;
};
