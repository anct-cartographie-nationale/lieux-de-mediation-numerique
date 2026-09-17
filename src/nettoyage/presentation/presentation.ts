import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const BALISES: RegleDeNettoyage = {
  nom: 'balises HTML',
  selecteur: /<\/?[a-z][^>]*>/iu,
  corriger: (aCorriger: string): string => aCorriger.replace(/<\/?[a-z][^>]*>/giu, ' ')
};

const ENTITES: ReadonlyMap<string, string> = new Map([
  ['&amp;', '&'],
  ['&lt;', '<'],
  ['&gt;', '>'],
  ['&quot;', '"'],
  ['&apos;', "'"],
  ['&nbsp;', ' ']
]);

const ENTITES_HTML: RegleDeNettoyage = {
  nom: 'entités HTML',
  selecteur: /&(?:[a-z]+|#\d+);/iu,
  corriger: (aCorriger: string): string =>
    aCorriger.replace(/&(?:[a-z]+|#\d+);/giu, (entite: string): string => {
      const connue: string | undefined = ENTITES.get(entite.toLowerCase());
      if (connue != null) return connue;
      const numerique: RegExpExecArray | null = /^&#(\d+);$/u.exec(entite);

      return numerique?.[1] == null ? entite : String.fromCodePoint(Number(numerique[1]));
    })
};

const ESPACES_MULTIPLES: RegleDeNettoyage = {
  nom: 'espaces multiples',
  selecteur: /\s{2,}/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s+/gu, ' ')
};

const ESPACES_DE_BORD: RegleDeNettoyage = {
  nom: 'espaces de bord',
  selecteur: /^\s+|\s+$/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

export const REGLES_PRESENTATION: readonly RegleDeNettoyage[] = [BALISES, ENTITES_HTML, ESPACES_MULTIPLES, ESPACES_DE_BORD];

export const nettoyerPresentation = (texte: string): string => appliquerRegles(REGLES_PRESENTATION, texte);
