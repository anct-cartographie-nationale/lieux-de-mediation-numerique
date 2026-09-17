/**
 * Les types de voie abrégés coûtent au géocodage : la Base Adresse Nationale ignore les
 * accents mais pas les abréviations, si bien que « Pl de la Liberte » ne se rapproche de
 * « Place de la Liberté » qu'à 0,73 quand la forme développée atteint 0,95.
 */
export const ABREVIATIONS_DE_TYPE_DE_VOIE: Readonly<Record<string, string>> = {
  ALL: 'Allée',
  AV: 'Avenue',
  AVE: 'Avenue',
  BD: 'Boulevard',
  BLD: 'Boulevard',
  CHE: 'Chemin',
  CHEM: 'Chemin',
  CRS: 'Cours',
  DR: 'Docteur',
  FG: 'Faubourg',
  GAL: 'Général',
  HAM: 'Hameau',
  IMP: 'Impasse',
  LOT: 'Lotissement',
  MAL: 'Maréchal',
  MTE: 'Montée',
  PAS: 'Passage',
  PDT: 'Président',
  PL: 'Place',
  QU: 'Quai',
  RES: 'Résidence',
  RTE: 'Route',
  SEN: 'Sentier',
  SQ: 'Square',
  ST: 'Saint',
  STE: 'Sainte',
  VLA: 'Villa'
};

/** Les types de voie que connaît le référentiel. Sert à repérer où commence l'adresse. */
export const TYPES_DE_VOIE: string =
  'rue|avenue|boulevard|place|chemin|route|impasse|all[ée]e|quai|cours|square|passage|sentier|voie|faubourg|esplanade|promenade|villa|cit[ée]|hameau|lotissement|mail|rond[- ]point|traverse|venelle|clos|domaine|parvis';
