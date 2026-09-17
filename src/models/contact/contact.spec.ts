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

  /**
   * Le modèle ne porte plus que l'E.164 : une seule écriture possible d'un même numéro. Les
   * 11221 numéros du jeu national le sont déjà tous.
   */
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

  /** Un numéro étranger, fût-il valide, n'a pas sa place sur une cartographie française. */
  it('refuse un numéro étranger', (): void => {
    expect(Contact.safe({ telephone: '+32470442543' })).toBeNull();
  });

  it('refuse un courriel mal formé dans la liste', (): void => {
    expect(Contact.safe({ courriels: ['contact@cartographienationale.fr', 'contact@gmail'] })).toBeNull();
  });
});
