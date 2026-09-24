import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const RETOURS_CHARIOT: RegleDeNettoyage = {
  nom: 'retours chariot',
  selecteur: /\r/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\r\n?/gu, '\n')
};

const ENTITES: ReadonlyMap<string, string> = new Map([
  ['&amp;', '&'],
  ['&lt;', '<'],
  ['&gt;', '>'],
  ['&quot;', '"'],
  ['&apos;', "'"],
  ['&nbsp;', ' ']
]);

const PLUS_GRAND_POINT_DE_CODE: number = 0x10ffff;

const decoderEntite = (entite: string): string => {
  const connue: string | undefined = ENTITES.get(entite.toLowerCase());
  if (connue != null) return connue;
  const numerique: RegExpExecArray | null = /^&#(\d+);$/u.exec(entite);
  const pointDeCode: number = Number(numerique?.[1]);

  return numerique == null || pointDeCode > PLUS_GRAND_POINT_DE_CODE ? entite : String.fromCodePoint(pointDeCode);
};

const decoderEntites = (aCorriger: string): string => {
  const decode: string = aCorriger.replace(/&(?:[a-z]+|#\d+);/giu, decoderEntite);

  return decode === aCorriger ? decode : decoderEntites(decode);
};

const ENTITES_HTML: RegleDeNettoyage = {
  nom: 'entités HTML, décodées jusqu’à ce qu’il n’en reste plus',
  selecteur: /&(?:[a-z]+|#\d+);/iu,
  corriger: decoderEntites
};

const BALISES_DE_SAUT_DE_LIGNE: RegleDeNettoyage = {
  nom: 'balises de saut de ligne en retour à la ligne',
  selecteur: /<br\b[^>]*>/iu,
  corriger: (aCorriger: string): string => aCorriger.replace(/<br\b[^>]*>/giu, '\n')
};

const BALISES_DE_PARAGRAPHE: RegleDeNettoyage = {
  nom: 'balises de paragraphe en saut de paragraphe',
  selecteur: /<\/?p\b[^>]*>/iu,
  corriger: (aCorriger: string): string => aCorriger.replace(/<\/?p\b[^>]*>/giu, '\n\n')
};

const AUTRES_BALISES: RegleDeNettoyage = {
  nom: 'autres balises HTML en espace',
  selecteur: /<\/?[a-z][^>]*>/iu,
  corriger: (aCorriger: string): string => aCorriger.replace(/<\/?[a-z][^>]*>/giu, ' ')
};

const ESPACES_MULTIPLES_DANS_UNE_LIGNE: RegleDeNettoyage = {
  nom: 'espaces multiples dans une ligne',
  selecteur: /[ \t]{2,}|\t/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[ \t]+/gu, ' ')
};

const ESPACES_DE_BORD_DE_LIGNE: RegleDeNettoyage = {
  nom: 'espaces de début et de fin de ligne',
  selecteur: /^[ \t]+|[ \t]+$/mu,
  corriger: (aCorriger: string): string => aCorriger.replace(/^[ \t]+|[ \t]+$/gmu, '')
};

const LIGNES_VIDES_MULTIPLES: RegleDeNettoyage = {
  nom: 'lignes vides multiples en un seul saut de paragraphe',
  selecteur: /\n{3,}/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\n{3,}/gu, '\n\n')
};

const ESPACES_DE_BORD: RegleDeNettoyage = {
  nom: 'espaces de bord',
  selecteur: /^\s+|\s+$/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

export const REGLES_PRESENTATION: readonly RegleDeNettoyage[] = [
  ENTITES_HTML,
  RETOURS_CHARIOT,
  BALISES_DE_SAUT_DE_LIGNE,
  BALISES_DE_PARAGRAPHE,
  AUTRES_BALISES,
  ESPACES_MULTIPLES_DANS_UNE_LIGNE,
  ESPACES_DE_BORD_DE_LIGNE,
  LIGNES_VIDES_MULTIPLES,
  ESPACES_DE_BORD
];

export const nettoyerPresentation = (texte: string): string => appliquerRegles(REGLES_PRESENTATION, texte);
