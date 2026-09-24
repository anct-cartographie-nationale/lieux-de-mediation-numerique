import { describe, it, expect } from 'vitest';
import { nettoyerPresentation } from './presentation';

describe('nettoyerPresentation', (): void => {
  it('should drop html tags', (): void => {
    expect(nettoyerPresentation('<br>APOR vous souhaite la bienvenue')).toBe('APOR vous souhaite la bienvenue');
    expect(nettoyerPresentation('un <strong>lieu</strong> ouvert')).toBe('un lieu ouvert');
  });

  it('should resolve html entities', (): void => {
    expect(nettoyerPresentation('accueil &amp; accompagnement')).toBe('accueil & accompagnement');
    expect(nettoyerPresentation('caf&#233;')).toBe('café');
  });

  it('should resolve html entities encoded twice', (): void => {
    expect(nettoyerPresentation('accueil &amp;amp; accompagnement')).toBe('accueil & accompagnement');
  });

  it('should keep a numeric entity beyond the last code point', (): void => {
    expect(nettoyerPresentation('caf&#99999999;')).toBe('caf&#99999999;');
  });

  it('should drop a tag hidden behind entities', (): void => {
    expect(nettoyerPresentation('un &lt;strong&gt;lieu&lt;/strong&gt; ouvert')).toBe('un lieu ouvert');
  });

  it('should turn a line break tag into a line break', (): void => {
    expect(nettoyerPresentation('Ateliers numériques<br>Permanence<br/>Accueil<BR />libre')).toBe(
      'Ateliers numériques\nPermanence\nAccueil\nlibre'
    );
  });

  it('should turn paragraph tags into a paragraph break', (): void => {
    expect(nettoyerPresentation('<p>Ateliers numériques</p><p class="note">Permanence</p>')).toBe(
      'Ateliers numériques\n\nPermanence'
    );
  });

  it('should keep paragraphs', (): void => {
    expect(nettoyerPresentation('Un lieu ouvert à tous.\n\nOuvert le lundi.')).toBe(
      'Un lieu ouvert à tous.\n\nOuvert le lundi.'
    );
  });

  it('should keep a dashed list', (): void => {
    const liste: string =
      'Nous accompagnons dans nos locaux ou en itinérance :\n\n- Des ateliers collectifs\n- Permanence numérique sur rendez-vous';

    expect(nettoyerPresentation(liste)).toBe(liste);
  });

  it('should drop spaces at the end and the start of a line', (): void => {
    expect(
      nettoyerPresentation(
        'Ateliers numériques sur inscription \nPermanence numérique sur rendez-vous\n\t Numéro de téléphone : 06 72 45 45 82'
      )
    ).toBe('Ateliers numériques sur inscription\nPermanence numérique sur rendez-vous\nNuméro de téléphone : 06 72 45 45 82');
  });

  it('should merge multiple spaces and tabs within a line', (): void => {
    expect(nettoyerPresentation('Un  lieu\t\touvert \t à tous\nAccueil\tlibre')).toBe('Un lieu ouvert à tous\nAccueil libre');
  });

  it('should reduce multiple blank lines to a single paragraph break', (): void => {
    expect(nettoyerPresentation('Ateliers\n\n\n\nPermanence\n \t \n  \nAccueil')).toBe('Ateliers\n\nPermanence\n\nAccueil');
  });

  it('should normalise carriage returns', (): void => {
    expect(nettoyerPresentation('Ateliers\r\nPermanence\rAccueil\r\n\r\nLibre')).toBe('Ateliers\nPermanence\nAccueil\n\nLibre');
  });

  it('should drop blanks around the whole text', (): void => {
    expect(nettoyerPresentation('\n\n  Un lieu ouvert à tous \n\n')).toBe('Un lieu ouvert à tous');
  });

  it('should leave a plain text untouched', (): void => {
    expect(nettoyerPresentation('Un lieu ouvert à tous')).toBe('Un lieu ouvert à tous');
  });

  it('should never throw', (): void => {
    expect(nettoyerPresentation('')).toBe('');
  });

  it.each([
    ['<br>APOR vous souhaite la bienvenue'],
    ['un <strong>lieu</strong>  ouvert'],
    ['accueil &amp;amp; accompagnement'],
    ['un &lt;strong&gt;lieu&lt;/strong&gt; ouvert'],
    ['&amp;lt;p&amp;gt;Ateliers'],
    ['caf&#99999999;'],
    ['Ateliers&#13;&#10;Permanence&#9;&#9;libre'],
    ['<p> Ateliers </p>\n\n<p>\tPermanence</p>'],
    ['Ateliers <br> <br> <br> Permanence'],
    [
      'Nous accompagnons dans nos locaux ou en itinérance :\n\n- Des ateliers collectifs\n- Permanence numérique sur rendez-vous'
    ],
    ['Ateliers numériques sur inscription \nPermanence numérique sur rendez-vous\nNuméro de téléphone : 06 72 45 45 82'],
    ['Ateliers\r\n\r\n\r\n \t \r\nPermanence'],
    ['\n\n  Un lieu ouvert à tous \n\n'],
    ['Un lieu \n ouvert']
  ])('should be idempotent on %j', (texte: string): void => {
    const nettoye: string = nettoyerPresentation(texte);

    expect(nettoyerPresentation(nettoye)).toBe(nettoye);
  });
});
