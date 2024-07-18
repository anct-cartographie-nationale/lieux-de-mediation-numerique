import { Courriel } from '../courriel';
import { Model } from '../model';
import { Url } from '../url';
import { TelephoneError } from './errors';

export type Contact = Model<
  'Contact',
  {
    telephone?: string;
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    courriels?: Courriel[];
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    site_web?: Url[];
  }
>;

export type ContactToValidate = Omit<Contact, 'isContact'>;

const TELEPHONE_REG_EXP: RegExp =
  /^(?:(?:\+|00)(?:33|262|269|508|590|594|596|681|687|689)[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)(?:(?:[1-9](?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]\d{3}){2})|\d{6}|\s\d{3}(?:\s\d{2}){3})$/u;

export const isValidTelephone = (telephone: string): boolean => TELEPHONE_REG_EXP.test(telephone);

const isValidContact = (contact: Omit<Contact, 'isContact'>): contact is Contact =>
  contact.telephone == null || isValidTelephone(contact.telephone);

const throwContactError = (contact: Omit<Contact, 'isContact'>): Contact => {
  if (contact.telephone != null && !isValidTelephone(contact.telephone)) {
    throw new TelephoneError(contact.telephone);
  }

  throw new Error();
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Contact = (contact: ContactToValidate): Contact =>
  isValidContact(contact) ? { ...contact } : throwContactError(contact);
