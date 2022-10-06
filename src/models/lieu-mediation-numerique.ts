/* eslint-disable @typescript-eslint/naming-convention */

import { Adresse } from './adresse';
import { Typologie } from './typologie';
import { Localisation } from './localisation';
import { Contact } from './contact';
/* eslint-disable-next-line @typescript-eslint/no-shadow */
import { Presentation } from './presentation';
import { Service } from './service';
import { PublicsAccueillis } from './public-accueilli';
import { ConditionsAccess } from './condition-access';
import { ModalitesAccompagnement } from './modalite-accompagnement';
import { Url } from './url';
import { Pivot } from './pivot';
import { CleBan } from './cle-ban';
import { LabelsNationaux } from './label-national';

export type LieuMediationNumerique = {
  id: string;
  pivot?: Pivot;
  nom: string;
  adresse: Adresse;
  localisation: Localisation;
  cle_ban?: CleBan;
  typologie?: Typologie[];
  contact?: Contact;
  horaires?: string;
  presentation?: Presentation;
  source?: string;
  structure_parente?: string;
  date_maj?: Date;
  services: Service[];
  publics_accueillis?: PublicsAccueillis;
  conditions_access?: ConditionsAccess;
  labels_nationaux?: LabelsNationaux;
  labels_autres?: string[];
  modalites_accompagnement?: ModalitesAccompagnement;
  accessibilite?: Url;
  prise_rdv?: Url;
};
