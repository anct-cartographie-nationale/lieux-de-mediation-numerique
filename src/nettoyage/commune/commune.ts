import { appliquerRegles, type RegleDeNettoyage } from '../regle';

/** Une précision entre parenthèses — « Sainte-Marie (Réunion) » — ne fait pas partie du nom. */
const PRECISION_ENTRE_PARENTHESES: RegleDeNettoyage = {
  nom: 'précision entre parenthèses',
  selecteur: /\s*\(.*\)\s*/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s*\(.*\)\s*/u, '')
};

/**
 * Séquelle d'un passage par une page de code DOS : le `Â` s'y est changé en `╢`. On ne traite
 * que ce cas, le seul rencontré, plutôt que de tenter une réparation d'encodage générale.
 */
const ACCENT_ABIME: RegleDeNettoyage = {
  nom: 'accent abîmé par un encodage DOS',
  selecteur: /╢/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/╢/gu, 'Â')
};

const APOSTROPHE_COURBE: RegleDeNettoyage = {
  nom: 'apostrophe courbe',
  selecteur: /’/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/’/gu, "'")
};

const SAINT_ABREGE_EN_TETE: RegleDeNettoyage = {
  nom: 'Saint abrégé en tête',
  selecteur: /^[Ss][Tt][-\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^[Ss][Tt][-\s]/gu, 'Saint-')
};

const SAINTE_ABREGE_EN_TETE: RegleDeNettoyage = {
  nom: 'Sainte abrégé en tête',
  selecteur: /^[Ss][Tt][Ee][-\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^[Ss][Tt][Ee][-\s]/gu, 'Sainte-')
};

const SAINT_ABREGE: RegleDeNettoyage = {
  nom: 'Saint abrégé',
  selecteur: /[-\s][Ss][Tt][-\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[-\s][Ss][Tt][-\s]/gu, '-Saint-')
};

const SAINTE_ABREGE: RegleDeNettoyage = {
  nom: 'Sainte abrégé',
  selecteur: /[-\s][Ss][Tt][Ee][-\s]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/[-\s][Ss][Tt][Ee][-\s]/gu, '-Sainte-')
};

/**
 * Ne retire que les espaces autour de la parenthèse : la parenthèse elle-même a déjà été
 * traitée par `PRECISION_ENTRE_PARENTHESES`. Conservée telle quelle depuis mednum-cli.
 */
const TEXTE_ENTRE_PARENTHESES: RegleDeNettoyage = {
  nom: 'texte entre parenthèses',
  selecteur: /\([^)]+\)/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

/** « Paris 15e » désigne Paris : l'arrondissement n'appartient pas au nom de la commune. */
const ARRONDISSEMENT: RegleDeNettoyage = {
  nom: 'arrondissement',
  selecteur: /\d+er?/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\d+er?/u, '')
};

/** Le CEDEX relève de l'acheminement postal, pas du nom de la commune. */
const CEDEX: RegleDeNettoyage = {
  nom: 'mention CEDEX',
  selecteur: /-?[Cc](?:[ÉE]DEX|[ée]dex)\s?\d*/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/-?[Cc](?:[ÉE]DEX|[ée]dex)\s?\d*/u, '')
};

const CHIFFRES: RegleDeNettoyage = {
  nom: 'chiffres',
  selecteur: /\d+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\d+/gu, '')
};

const ESPACE_APRES_APOSTROPHE: RegleDeNettoyage = {
  nom: 'espace après apostrophe',
  selecteur: /'\s+/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/'\s+/u, "'")
};

const ESPACES_DE_BORD: RegleDeNettoyage = {
  nom: 'espaces de bord',
  selecteur: /^\s+|\s+$/u,
  corriger: (aCorriger: string): string => aCorriger.trim()
};

/** Le référentiel des communes écrit « Le Pont-de-Claix », jamais « Le Pont de Claix ». */
const ESPACES_EN_TIRETS: RegleDeNettoyage = {
  nom: 'espaces en tirets',
  selecteur: /\s/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\s/gu, '-')
};

/**
 * L'ordre est celui de mednum-cli, et il porte du sens : les parenthèses tombent avant les
 * chiffres, faute de quoi « Sainte-Marie (97438) » perdrait son code avant sa parenthèse et
 * laisserait une paire vide ; les espaces deviennent des tirets en dernier, une fois que les
 * règles qui s'appuient sur l'espace ont fait leur travail.
 */
export const REGLES_COMMUNE: readonly RegleDeNettoyage[] = [
  PRECISION_ENTRE_PARENTHESES,
  ACCENT_ABIME,
  APOSTROPHE_COURBE,
  SAINT_ABREGE_EN_TETE,
  SAINTE_ABREGE_EN_TETE,
  SAINT_ABREGE,
  SAINTE_ABREGE,
  TEXTE_ENTRE_PARENTHESES,
  ARRONDISSEMENT,
  CEDEX,
  CHIFFRES,
  ESPACE_APRES_APOSTROPHE,
  ESPACES_DE_BORD,
  ESPACES_EN_TIRETS
];

/**
 * Le nom de commune réparé, prêt à être rapproché d'un référentiel.
 *
 * Les corrections visant une commune nommément désignée — une coquille d'un producteur
 * particulier — n'ont pas leur place ici : elles appartiennent à qui lit cette source.
 */
export const nettoyerCommune = (commune: string): string => appliquerRegles(REGLES_COMMUNE, commune);
