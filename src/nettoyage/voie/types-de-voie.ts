/**
 * Les types de voie abrégés coûtent au géocodage : la Base Adresse Nationale ignore les
 * accents mais pas les abréviations.
 *
 * **Le contenu de cette table est mesuré, pas supposé.** Pour chaque abréviation, des adresses
 * réelles du jeu national ont été soumises à la BAN sous leurs deux formes — 883 paires, les
 * 27 abréviations couvertes. Développer fait gagner **+0,13 de score en moyenne pondérée**, et
 * 26 abréviations sur 27 y gagnent individuellement.
 *
 * Quelques écarts mesurés : `BLD` +0,229, `FG` +0,199, `AV` +0,153, `PL` +0,132, `ALL` +0,093,
 * `AVE` +0,080.
 *
 * `LOT` est **absent à dessein** : seul des 27, il fait *perdre* du score — −0,051 en tête
 * d'adresse (2 paires gagnantes sur 9) et −0,163 quand le mot appartient au nom de la voie
 * (0 sur 2). La BAN traite mieux `LOT`, qu'elle garde comme nom, que `Lotissement`, qu'elle
 * paraît défalquer comme type. L'échantillon est petit — le jeu national ne contient que onze
 * adresses portant ce mot — mais la direction est la même dans les deux positions.
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
