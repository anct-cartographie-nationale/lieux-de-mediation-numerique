import { appliquerRegles, type RegleDeNettoyage } from '../regle';
import { relireCommeUtf8 } from './decodeur-utf8';
import { ABREVIATIONS_DE_TYPE_DE_VOIE } from './types-de-voie';

/**
 * Une chaîne dont les octets UTF-8 ont été lus comme du latin-1 : « Ã© » pour « é ». On la
 * relit dans le bon sens.
 *
 * `TextDecoder` plutôt que `Buffer` : la bibliothèque est consommée par du code navigateur, et
 * `Buffer` n'y existe pas. Les deux produisent le même résultat.
 */
const ENCODAGE_ABIME: RegleDeNettoyage = {
  nom: 'encodage abîmé',
  selecteur: /Ã[\x80-\xFF]/u,
  corriger: relireCommeUtf8
};

const ESPACES_MULTIPLES: RegleDeNettoyage = {
  nom: 'espaces multiples',
  selecteur: /\s+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s+/gu, ' ')
};

/**
 * L'octet 0x92 de Windows-1252 est une apostrophe courbe ; décodé comme de l'UTF-8 il donne
 * U+0092, un caractère de contrôle invisible. On le rend à sa forme lisible.
 *
 * L'échappement est explicite là où mednum-cli porte le caractère en littéral : invisible dans
 * un éditeur, il se perd au premier copier-coller — ce qui vient d'arriver en le déplaçant.
 */
const APOSTROPHE_ABIMEE: RegleDeNettoyage = {
  nom: 'apostrophe abîmée par un encodage Windows-1252',
  selecteur: /\u0092/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\u0092/gu, "'")
};

/** Un numéro zéro n'existe pas : c'est une case de formulaire restée vide. */
const NUMERO_ZERO: RegleDeNettoyage = {
  nom: 'numéro zéro',
  selecteur: /^(0 Rue|00 Rue)/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^(0 Rue|00 Rue)/gu, 'Rue')
};

const CARACTERES_INTERDITS: RegleDeNettoyage = {
  nom: 'caractères interdits',
  selecteur: /[",²]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[",²]/gu, '')
};

const RETOURS_A_LA_LIGNE: RegleDeNettoyage = {
  nom: 'retours à la ligne',
  selecteur: /\n|\\n/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\n|\\n/u, ' ')
};

/** `null` en tête est un artefact de sérialisation, jamais un nom de voie. */
const PREFIXE_NULL: RegleDeNettoyage = {
  nom: 'préfixe null',
  selecteur: /^[Nn][Uu][Ll][Ll]\s+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^[Nn][Uu][Ll][Ll]\s+/u, '')
};

/** Une voie réduite à un code postal ne désigne aucune voie. */
const SEULEMENT_UN_CODE_POSTAL: RegleDeNettoyage = {
  nom: 'seulement un code postal',
  selecteur: /^\d{5}(\s.*)?$/u,
  corriger: (): string => ''
};

const CODE_POSTAL_ET_SUITE: RegleDeNettoyage = {
  nom: 'code postal et ce qui suit',
  selecteur: /^(?<voie>.*?)\s\d{5}\s\w+/u,
  corriger: (aCorriger: string): string => /^(?<voie>.*?)\s\d{5}\s\w+/u.exec(aCorriger)?.groups?.['voie'] ?? aCorriger
};

/**
 * `appliquerRegle` reconstruit le sélecteur avec les seuls drapeaux utiles : un motif qui
 * compterait sur `i` le garde, mais la casse est ici portée par le motif lui-même.
 *
 * Les bornes de mot `\b` ne conviennent pas : sous `u` elles tiennent une lettre accentuée pour
 * une non-lettre, si bien que `All` serait reconnu au début d'`Allée` et la développerait en
 * `Alléeée`. Les regards sur `\p{L}` couvrent tout l'alphabet.
 */
const touteCasse = (abreviation: string): string =>
  [abreviation, `${abreviation[0]}${abreviation.slice(1).toLowerCase()}`, abreviation.toLowerCase()].join('|');

const MOTIF_ABREVIATION: RegExp = new RegExp(
  `(?<![\\p{L}\\d])(${Object.keys(ABREVIATIONS_DE_TYPE_DE_VOIE).map(touteCasse).join('|')})\\.?(?![\\p{L}\\d])`,
  'gu'
);

const ABREVIATIONS_DE_VOIE: RegleDeNettoyage = {
  nom: 'abréviations de type de voie',
  selecteur: MOTIF_ABREVIATION,
  corriger: (aCorriger: string): string =>
    aCorriger.replace(
      MOTIF_ABREVIATION,
      (abreviation: string): string => ABREVIATIONS_DE_TYPE_DE_VOIE[abreviation.replace('.', '').toUpperCase()] ?? abreviation
    )
};

/**
 * La Base Adresse Nationale écrit le suffixe collé au numéro — « 1BIS » — et pénalise l'espace :
 * « 1 bis rue des Ajoncs » se rapproche à 0,82 quand « 1bis rue des Ajoncs » atteint 0,97, pour
 * la même adresse. Mesuré sur les deux cent dix-sept adresses du jeu national qui portent ce
 * motif.
 */
const SUFFIXE_DE_NUMERO: RegleDeNettoyage = {
  nom: 'suffixe bis, ter ou quater collé au numéro',
  selecteur: /^\s*\d+\s+([Bb][Ii][Ss]|[Tt][Ee][Rr]|[Qq][Uu][Aa][Tt][Ee][Rr])\b/u,
  corriger: (aCorriger: string): string =>
    aCorriger.replace(
      /^(\s*\d+)\s+([Bb][Ii][Ss]|[Tt][Ee][Rr]|[Qq][Uu][Aa][Tt][Ee][Rr])\b/u,
      (_: string, numero: string, suffixe: string): string => `${numero}${suffixe.toLowerCase()}`
    )
};

const ESPACES_DE_BORD: RegleDeNettoyage = {
  nom: 'espaces de bord',
  selecteur: /^\s+|\s+$/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

/**
 * L'ordre vient de mednum-cli. Il compte : l'encodage se répare avant tout le reste, sans quoi
 * les motifs suivants travailleraient sur des caractères faux ; les espaces de bord tombent en
 * dernier, une fois que les autres règles ont pu en produire.
 *
 * Les corrections visant une adresse nommément désignée — la coquille d'un producteur — ne
 * figurent pas ici : elles appartiennent à qui lit cette source.
 */
export const REGLES_VOIE: readonly RegleDeNettoyage[] = [
  ENCODAGE_ABIME,
  ESPACES_MULTIPLES,
  APOSTROPHE_ABIMEE,
  NUMERO_ZERO,
  CARACTERES_INTERDITS,
  RETOURS_A_LA_LIGNE,
  PREFIXE_NULL,
  SEULEMENT_UN_CODE_POSTAL,
  CODE_POSTAL_ET_SUITE,
  ABREVIATIONS_DE_VOIE,
  SUFFIXE_DE_NUMERO,
  ESPACES_DE_BORD
];

/** La voie réparée, telle qu'on accepterait de la publier. */
export const nettoyerVoie = (voie: string): string => appliquerRegles(REGLES_VOIE, voie);
