/* eslint-disable @typescript-eslint/naming-convention */

import { Adresse } from './adresse';
import { Typologies } from './typologie';
import { Localisation } from './localisation';
import { Contact } from './contact';
/* eslint-disable-next-line @typescript-eslint/no-shadow */
import { Presentation } from './presentation';
import { Services } from './service';
import { PublicsAccueillis } from './public-accueilli';
import { FraisACharge } from './frais-a-charge';
import { ModalitesAccompagnement } from './modalite-accompagnement';
import { Url } from './url';
import { Pivot } from './pivot';
import { LabelsNationaux } from './label-national';
import { Id } from './id';
import { Nom } from './nom';

export type LieuMediationNumerique = {
  id: Id;
  pivot: Pivot;
  nom: Nom;
  adresse: Adresse;
  localisation?: Localisation;
  typologies?: Typologies;
  contact?: Contact;
  horaires?: string;
  presentation?: Presentation;
  source?: string;
  structure_parente?: string;
  date_maj: Date;
  services: Services;
  publics_accueillis?: PublicsAccueillis;
  frais_a_charge?: FraisACharge;
  labels_nationaux?: LabelsNationaux;
  labels_autres?: string[];
  modalites_accompagnement?: ModalitesAccompagnement;
  accessibilite?: Url;
  prise_rdv?: Url;
};
