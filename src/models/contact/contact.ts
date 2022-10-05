import { Model } from '../model';
import { Url } from '../url/url';
import { CourrielError, TelephoneError } from './errors';

export type Contact = Model<
  'Contact',
  {
    telephone?: string;
    courriel?: string;
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    site_web?: Url[];
  }
>;

export type ContactToValidate = Omit<Contact, 'isContact'>;

const COURRIEL_REG_EXP: RegExp =
  /* eslint-disable-next-line require-unicode-regexp */
  /^(?:(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(?:(?:[a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;

const TELEPHONE_REG_EXP: RegExp =
  /^(?:(?:\+|00)(?:33|594|262|596|269|687|689|590|508|681)[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/u;

const isValidCourriel = (courriel: string): boolean => COURRIEL_REG_EXP.test(courriel);

const isValidTelephone = (telephone: string): boolean => TELEPHONE_REG_EXP.test(telephone);

const isValidContact = (contact: Omit<Contact, 'isContact'>): contact is Contact =>
  (contact.courriel == null || isValidCourriel(contact.courriel)) &&
  (contact.telephone == null || isValidTelephone(contact.telephone));

const throwContactError = (contact: Omit<Contact, 'isContact'>): Contact => {
  if (contact.courriel != null && !isValidCourriel(contact.courriel)) {
    throw new CourrielError(contact.courriel);
  }

  if (contact.telephone != null && !isValidTelephone(contact.telephone)) {
    throw new TelephoneError(contact.telephone);
  }

  throw new Error();
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const Contact = (contact: ContactToValidate): Contact =>
  isValidContact(contact) ? { ...contact } : throwContactError(contact);
