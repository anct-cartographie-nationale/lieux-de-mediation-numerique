import { describe, it, expect } from 'vitest';
import { Courriel } from '../courriel';
import { Url } from '../url';
import { Contact, type ContactToValidate } from './contact';
import { TelephoneError } from './errors';

describe('contact model', (): void => {
  it('should create a valid contact', (): void => {
    const contactData: ContactToValidate = {
      telephone: '+33145896378',
      courriels: [Courriel('contact@cartographienationale.fr')],
      site_web: [Url('http://www.cartographienationale.fr')]
    };

    const contact: Contact = Contact(contactData);

    expect(contact).toStrictEqual({ ...contactData } as Contact);
  });

  it('should create a valid contact with only telephone property', (): void => {
    const contactData: ContactToValidate = {
      telephone: '+33145896378'
    };

    const contact: Contact = Contact(contactData);

    expect(contact).toStrictEqual({ ...contactData } as Contact);
  });

  it('should create a valid contact with only courriel property', (): void => {
    const contactData: ContactToValidate = {
      courriels: [Courriel('contact@cartographienationale.fr')]
    };

    const contact: Contact = Contact(contactData);

    expect(contact).toStrictEqual({ ...contactData } as Contact);
  });

  it('should create a valid contact with a phone from French Guiana', (): void => {
    const contactData: ContactToValidate = {
      telephone: '+594694020905',
      courriels: [Courriel('direction.yenkumu.lutu@gmail.com')],
      site_web: [Url('https://www.facebook.com/YenkumuLutuPapaichton/')]
    };

    const contact: Contact = Contact(contactData);

    expect(contact).toStrictEqual({ ...contactData } as Contact);
  });

  it('should throw TelephoneError when telephone is invalid', (): void => {
    const contactData: ContactToValidate = {
      telephone: 'error'
    };

    expect((): void => {
      Contact(contactData);
    }).toThrow(new TelephoneError('error'));
  });

  it('should throw TelephoneError when telephone has missing numbers', (): void => {
    const contactData: ContactToValidate = {
      telephone: '024178384'
    };

    expect((): void => {
      Contact(contactData);
    }).toThrow(new TelephoneError('024178384'));
  });

  /**
   * Le modèle ne porte plus que l'E.164 : une seule écriture possible d'un même numéro. Les
   * 11221 numéros du jeu national le sont déjà tous.
   */
  it('should refuse the national format, which is a display concern', (): void => {
    expect((): void => {
      Contact({ telephone: '0 809 36 12 12' });
    }).toThrow(new TelephoneError('0 809 36 12 12'));
  });

  it('should allow nouvelle caledonie telephone format (indicatif + 6 digits)', (): void => {
    const contactData: ContactToValidate = {
      telephone: '+687241541'
    };

    const contact: Contact = Contact(contactData);

    expect(contact).toStrictEqual({
      telephone: '+687241541'
    });
  });

  it.each([['+33102030405'], ['+262262202020'], ['+590690000001'], ['+508412345']])(
    'should accept %s, an E.164 number the national schema admits',
    (telephone: string): void => {
      expect(Contact({ telephone }).telephone).toBe(telephone);
    }
  );

  /** Un numéro étranger, fût-il valide, n'a pas sa place sur une cartographie française. */
  it('should refuse a foreign number', (): void => {
    expect((): void => {
      Contact({ telephone: '+32470442543' });
    }).toThrow(new TelephoneError('+32470442543'));
  });
});
