import { describe, it, expect } from 'vitest';
import { nettoyerTelephone, telephoneCanonique } from './telephone';

describe('nettoyerTelephone', (): void => {
  const nettoyer = nettoyerTelephone();

  it('should drop separators and surrounding words', (): void => {
    expect(nettoyer('Tel : 01 02 03 04 05')).toBe('0102030405');
    expect(nettoyer('01 02 03 04 05 (accueil)')).toBe('0102030405');
    expect(nettoyer('0102030405 poste 12')).toBe('0102030405');
  });

  it('should keep the first of several numbers', (): void => {
    expect(nettoyer('0102030405//0607080910')).toBe('0102030405');
    expect(nettoyer('0102030405\n0607080910')).toBe('0102030405');
  });

  it('should turn a short national number into its geographic equivalent', (): void => {
    expect(nettoyer('3230')).toBe('+33969322121');
    expect(nettoyer('3960')).toBe('+33971103960');
  });

  it('should add the missing plus before a country code', (): void => {
    expect(nettoyer('33102030405')).toBe('+33102030405');
    expect(nettoyer('+0102030405')).toBe('+33102030405');
  });

  it('should read the overseas country code from the postal code of the place', (): void => {
    expect(nettoyerTelephone('97400')('102030405')).toBe('+262102030405');
    expect(nettoyerTelephone('75001')('102030405')).toBe('+33102030405');
    expect(nettoyerTelephone()('102030405')).toBe('+33102030405');
  });

  it('should never throw', (): void => {
    expect(nettoyer('')).toBe('');
  });
});

describe('telephoneCanonique', (): void => {
  it('should render a national number in E.164', (): void => {
    expect(telephoneCanonique('01 02 03 04 05')).toBe('+33102030405');
    expect(telephoneCanonique('01.02.03.04.05')).toBe('+33102030405');
    expect(telephoneCanonique('0033102030405')).toBe('+33102030405');
  });

  it('should give overseas numbers their own country code', (): void => {
    expect(telephoneCanonique('02 62 20 20 20')).toBe('+262262202020');
    expect(telephoneCanonique('0690000001')).toBe('+590690000001');
  });

  it('should rend null when it is not a number', (): void => {
    expect(telephoneCanonique('12')).toBeNull();
    expect(telephoneCanonique('')).toBeNull();
  });

  it('should accept a valid foreign number, which validation will refuse later', (): void => {
    expect(telephoneCanonique('+32 470 44 25 43')).toBe('+32470442543');
  });
  it.each([
    ['39 60', '+33971103960'],
    ['3960', '+33971103960'],
    ['32 30', '+33969322121'],
    ['3230', '+33969322121']
  ])('reconnaît le numéro court %s, espaces compris', (brut: string, attendu: string): void => {
    expect(telephoneCanonique(nettoyerTelephone()(brut))).toBe(attendu);
  });

  it.each([
    ['03 23 06 24 70', '+33323062470'],
    ['03 23 08 81 81', '+33323088181'],
    ['04 28 67 32 30', '+33428673230'],
    ['03 96 01 02 03', '+33396010203']
  ])('laisse %s intact, un numéro court ne vaut que seul', (brut: string, attendu: string): void => {
    expect(telephoneCanonique(nettoyerTelephone()(brut))).toBe(attendu);
  });
});
