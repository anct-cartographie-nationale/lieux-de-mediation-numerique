import { appliquerRegles, type RegleDeNettoyage } from '../regle';
import { TYPES_DE_VOIE } from './types-de-voie';

const PREMIER_NUMERO_DE_LA_FOURCHETTE: RegleDeNettoyage = {
  nom: 'premier numéro de la fourchette',
  selecteur: /^\s*\d+\s*[-–/]\s*\d+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^(\s*\d+)\s*[-–/]\s*\d+/u, '$1')
};

const DETAIL_ENTRE_PARENTHESES: RegExp =
  /\((?=[^)]*(?:\d|rdc|porte|[ée]tage|b[âa]t|imm|r[ée]sidence|escalier|hall|entr[ée]e|niveau|appt?|apt))[^)]*\)/giu;

const DETAIL_DE_BATIMENT_ENTRE_PARENTHESES: RegleDeNettoyage = {
  nom: 'détail de bâtiment entre parenthèses, jamais une commune déléguée',
  selecteur: /\((?=[^)]*(?:\d|[Rr][Dd][Cc]|[Pp]orte|[ÉEée]tage|[Bb][ÂAâa]t|[Ii]mm|[Rr][ée]sidence))[^)]*\)/u,
  corriger: (aCorriger: string): string =>
    aCorriger
      .replace(DETAIL_ENTRE_PARENTHESES, ' ')
      .replace(/\s{2,}/gu, ' ')
      .trim()
};

const BOITE_POSTALE: RegExp = /(?<![\p{L}\d])(BP|B\.P\.|CS|CEDEX|C[ÉE]DEX)\s*\d*(?![\p{L}\d])/giu;

const MENTION_DE_BOITE_POSTALE: RegleDeNettoyage = {
  nom: 'mention de boîte postale ou de CEDEX',
  selecteur: /(?<![\p{L}\d])([Bb][Pp]|[Cc][Ss]|[Cc][ÉEée][Dd][Ee][Xx])(?![\p{L}\d])/u,
  corriger: (aCorriger: string): string =>
    aCorriger
      .replace(BOITE_POSTALE, ' ')
      .replace(/\s{2,}/gu, ' ')
      .trim()
};

const DETAIL_DE_BATIMENT: RegExp =
  /(?<![\p{L}\d])(b[âa]t(?:iment)?|imm(?:euble)?|r[ée]sidence|[ée]tage|rdc|appt?|apt|escalier|hall|entr[ée]e|niveau)(?![\p{L}\d])/iu;
const DETERMINANT_AVANT: RegExp = /(?:de|du|des|d'|d’|la|le|les|l'|l’|au|aux|en)\s*$/iu;
const UN_TYPE_DE_VOIE: RegExp = new RegExp(`(?:${TYPES_DE_VOIE})(?![\\p{L}\\d])`, 'iu');

const DETAIL_DE_BATIMENT_EN_QUEUE: RegleDeNettoyage = {
  nom: 'détail de bâtiment, étage ou porte',
  selecteur: DETAIL_DE_BATIMENT,
  corriger: (aCorriger: string): string => {
    const trouve: RegExpExecArray | null = DETAIL_DE_BATIMENT.exec(aCorriger);
    if (trouve == null) return aCorriger;
    const avant: string = aCorriger.slice(0, trouve.index).trim();

    return avant.split(/\s+/u).length < 3 || !UN_TYPE_DE_VOIE.test(avant) || DETERMINANT_AVANT.test(avant) ? aCorriger : avant;
  }
};

const ADRESSE_DEPUIS_LE_TYPE_DE_VOIE: RegExp = new RegExp(
  `^([^\\d]*?)((?:\\d+\\s*(?:bis|ter|quater)?\\s*)?(?:${TYPES_DE_VOIE})(?![\\p{L}\\d])\\s+\\S+\\s+\\S+.*)$`,
  'iu'
);
const DEBUT_DE_NOM_COMPOSE: RegExp =
  /^(?:grande?|petite?|vieille|vieux|haute?|basse?|belle?|beau|nouvelle?|nouveau|longue?|premi[èe]re?|derni[èe]re?|hlm)$/iu;

const CE_QUI_PRECEDE_LE_TYPE_DE_VOIE: RegleDeNettoyage = {
  nom: 'ce qui précède le type de voie',
  selecteur: ADRESSE_DEPUIS_LE_TYPE_DE_VOIE,
  corriger: (aCorriger: string): string => {
    const trouve: RegExpExecArray | null = ADRESSE_DEPUIS_LE_TYPE_DE_VOIE.exec(aCorriger);
    if (trouve?.[1] == null || trouve[2] == null || trouve[1].trim() === '') return aCorriger;
    if (/\S-$/u.test(trouve[1])) return aCorriger;
    const dernierMot: string = trouve[1].trim().replace(/-+$/u, '').split(/\s+/u).pop() ?? '';

    return DEBUT_DE_NOM_COMPOSE.test(dernierMot) ? aCorriger : trouve[2];
  }
};

const LETTRE_ENTRE_NUMERO_ET_TYPE: RegExp = new RegExp(`^(\\s*\\d+)\\s+[a-z]\\s+(?=(?:${TYPES_DE_VOIE})(?![\\p{L}\\d]))`, 'iu');

const LETTRE_ISOLEE_APRES_LE_NUMERO: RegleDeNettoyage = {
  nom: 'lettre isolée entre le numéro et le type de voie',
  selecteur: /^\s*\d+\s+[A-Za-z]\s+\p{L}/u,
  corriger: (aCorriger: string): string => aCorriger.replace(LETTRE_ENTRE_NUMERO_ET_TYPE, '$1 ')
};

export const REGLES_VOIE_POUR_RECHERCHE: readonly RegleDeNettoyage[] = [
  PREMIER_NUMERO_DE_LA_FOURCHETTE,
  DETAIL_DE_BATIMENT_ENTRE_PARENTHESES,
  MENTION_DE_BOITE_POSTALE,
  DETAIL_DE_BATIMENT_EN_QUEUE,
  CE_QUI_PRECEDE_LE_TYPE_DE_VOIE,
  LETTRE_ISOLEE_APRES_LE_NUMERO
];

export const nettoyerVoiePourRecherche = (voie: string): string => appliquerRegles(REGLES_VOIE_POUR_RECHERCHE, voie);
