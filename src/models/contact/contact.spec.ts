import { describe, expect, it } from 'vitest';
import { Courriel } from '../courriel';
import { Url } from '../url';
import { Contact, type ContactToValidate } from './contact';

describe('contact model', (): void => {
  it('construit un contact valide', (): void => {
    const contactData: ContactToValidate = {
      telephone: '+33145896378',
      courriels: [Courriel('contact@cartographienationale.fr')],
      site_web: [Url('http://www.cartographienationale.fr')]
    };

    const contact: Contact = Contact(contactData);

    expect(contact).toStrictEqual({ ...contactData });
  });

  it('construit un contact qui ne porte qu’un téléphone', (): void => {
    expect(Contact({ telephone: '+33145896378' })).toStrictEqual({ telephone: '+33145896378' });
  });

  it('construit un contact qui ne porte qu’un courriel', (): void => {
    expect(Contact({ courriels: ['contact@cartographienationale.fr'] })).toStrictEqual({
      courriels: ['contact@cartographienationale.fr']
    });
  });

  it('construit un contact dont le téléphone est guyanais', (): void => {
    expect(Contact({ telephone: '+594694020905' }).telephone).toBe('+594694020905');
  });

  it.each([['error'], ['024178384']])('refuse le téléphone %s', (telephone: string): void => {
    expect(Contact.safe({ telephone })).toBeNull();
  });

  it('refuse la mise en forme nationale, qui est une affaire d’affichage', (): void => {
    expect(Contact.safe({ telephone: '0 809 36 12 12' })).toBeNull();
  });

  it('accepte un numéro de Nouvelle-Calédonie, indicatif suivi de six chiffres', (): void => {
    expect(Contact({ telephone: '+687241541' })).toStrictEqual({ telephone: '+687241541' });
  });

  it.each([['+33102030405'], ['+262262202020'], ['+590690000001'], ['+508412345']])(
    'accepte %s, un numéro E.164 que le schéma national admet',
    (telephone: string): void => {
      expect(Contact({ telephone }).telephone).toBe(telephone);
    }
  );

  it('refuse un numéro étranger', (): void => {
    expect(Contact.safe({ telephone: '+32470442543' })).toBeNull();
  });

  it('refuse un courriel mal formé dans la liste', (): void => {
    expect(Contact.safe({ courriels: ['contact@cartographienationale.fr', 'contact@gmail'] })).toBeNull();
  });

  it.each([['+33123456'], ['+33000000000'], ['+590123456'], ['+508608839449']])(
    'refuse %s, qui a la forme d’un numéro français sans en être un',
    (telephone: string): void => {
      expect(Contact.safe({ telephone })).toBeNull();
    }
  );

  it('refuse un numéro écrit avec des espaces, même valide', (): void => {
    expect(Contact.safe({ telephone: '+33 1 02 03 04 05' })).toBeNull();
  });
});
