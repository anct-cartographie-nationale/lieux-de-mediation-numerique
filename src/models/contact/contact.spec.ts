import { Courriel } from '../courriel';
import { Url } from '../url';
import { Contact, ContactToValidate } from './contact';
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

  it('should allow 0 8XX XX XX XX telephone format', (): void => {
    const contactData: ContactToValidate = {
      telephone: '0 809 36 12 12'
    };

    const contact: Contact = Contact(contactData);

    expect(contact).toStrictEqual({
      telephone: '0 809 36 12 12'
    });
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
});
