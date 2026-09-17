import type { Courriel } from '../courriel';
import type { Model } from '../model';
import type { Url } from '../url';
import { TelephoneError } from './errors';

/** La forme, telle qu'on l'écrit avant de la faire valider. */
export type ContactToValidate = {
  telephone?: string;
  courriels?: Courriel[];
  site_web?: Url[];
};

/** Une valeur dont le constructeur a vérifié chaque partie. */
export type Contact = Model<'Contact', ContactToValidate>;

/**
 * L'E.164, et rien d'autre : une seule écriture possible d'un même numéro. La mise en forme
 * nationale — `01 02 03 04 05` — redevient ce qu'elle est, une affaire d'affichage.
 *
 * Les indicatifs sont ceux que le schéma national admet : métropole et outre-mer. Un numéro
 * étranger, fût-il valide, n'a pas sa place sur une cartographie française.
 */
const TELEPHONE_REG_EXP: RegExp = /^\+(?:33|262|269|508|590|594|596|681|687|689)\d{6,9}$/u;

export const isValidTelephone = (telephone: string): boolean => TELEPHONE_REG_EXP.test(telephone);

const isValidContact = (contact: ContactToValidate): contact is Contact =>
  contact.telephone == null || isValidTelephone(contact.telephone);

const throwContactError = (contact: ContactToValidate): Contact => {
  if (contact.telephone != null && !isValidTelephone(contact.telephone)) {
    throw new TelephoneError(contact.telephone);
  }

  throw new Error();
};

export const Contact = (contact: ContactToValidate): Contact =>
  isValidContact(contact) ? { ...contact } : throwContactError(contact);
