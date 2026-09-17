import { describe, it, expect } from 'vitest';
import { nettoyerCourriel } from './courriel';

describe('nettoyerCourriel', (): void => {
  it('should trim and drop a mailto prefix', (): void => {
    expect(nettoyerCourriel('  contact@example.fr  ')).toBe('contact@example.fr');
    expect(nettoyerCourriel('mailto:contact@example.fr')).toBe('contact@example.fr');
  });

  it('should repair a doubled at sign and a leading dot', (): void => {
    expect(nettoyerCourriel('contact@@example.fr')).toBe('contact@example.fr');
    expect(nettoyerCourriel('.contact@example.fr')).toBe('contact@example.fr');
  });

  it('should reveal an at sign hidden from harvesters', (): void => {
    expect(nettoyerCourriel('contact[a]example.fr')).toBe('contact@example.fr');
  });

  it('should drop accents, which an address does not carry', (): void => {
    expect(nettoyerCourriel('prénom@example.fr')).toBe('prenom@example.fr');
  });

  it('should unify separators on the pipe the national schema uses', (): void => {
    expect(nettoyerCourriel('a@example.fr et b@example.fr')).toBe('a@example.fr|b@example.fr');
    expect(nettoyerCourriel('a@example.fr;b@example.fr')).toBe('a@example.fr|b@example.fr');
  });

  it.each([['contact @example.fr'], ['contact@ example.fr'], ['contact @ example.fr']])(
    'should join %s across the at sign',
    (courriel: string): void => {
      expect(nettoyerCourriel(courriel)).toBe('contact@example.fr');
    }
  );

  it('should still drop a label that precedes the address', (): void => {
    expect(nettoyerCourriel('mail contact@example.fr')).toBe('contact@example.fr');
    expect(nettoyerCourriel('Contact : contact@example.fr')).toBe('contact@example.fr');
  });

  it('should never throw', (): void => {
    expect(nettoyerCourriel('')).toBe('');
  });
  it('ne coupe pas un mot qui contient « et » ou « ou »', (): void => {
    expect(nettoyerCourriel('mediatheque;creteil.abbaye@gpsea.fr')).toBe('creteil.abbaye@gpsea.fr');
    expect(nettoyerCourriel('bourgogne@exemple.fr')).toBe('bourgogne@exemple.fr');
  });

  it.each([['a@x.fr et b@y.fr'], ['a@x.fr ou b@y.fr'], ['a@x.fr / b@y.fr']])(
    'sépare encore %s, où le mot est bien un séparateur',
    (courriels: string): void => {
      expect(nettoyerCourriel(courriels)).toBe('a@x.fr|b@y.fr');
    }
  );

  it.each([
    ['sp-franceservices-fougeres@ille-et-vilaine.gouv.fr'],
    ['sp-provins-france-services@seine-et-marne.gouv.fr'],
    ['sp-briey-franceservices@meurthe-et-moselle.gouv.fr'],
    ['franceservices-nogentlerotrou@eure-et-loir.gouv.fr'],
    ['sous-prefecture-de-chalon-s-saone@saone-et-loire.pref.gouv.fr'],
    ['fretigney-et-velloreille@france-services.gouv.fr'],
    ['msap.scey-sur-saone-et-st-albin@laposte.fr'],
    ['eco-et-logique@hotmail.fr']
  ])('laisse %s entier, le tiret ne fait pas du mot un séparateur', (courriel: string): void => {
    expect(nettoyerCourriel(courriel)).toBe(courriel);
  });
});
