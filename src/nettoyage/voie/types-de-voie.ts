export const ABREVIATIONS_DE_TYPE_DE_VOIE: Readonly<Record<string, string>> = {
  ALL: 'Allée',
  AV: 'Avenue',
  AVE: 'Avenue',
  BD: 'Boulevard',
  BLD: 'Boulevard',
  CDT: 'Commandant',
  CHE: 'Chemin',
  CHEM: 'Chemin',
  CHS: 'Chaussée',
  CRS: 'Cours',
  DOC: 'Docteur',
  DR: 'Docteur',
  ESP: 'Esplanade',
  FG: 'Faubourg',
  GAL: 'Général',
  GDE: 'Grande',
  GEN: 'Général',
  HAM: 'Hameau',
  IMP: 'Impasse',
  MAL: 'Maréchal',
  MTE: 'Montée',
  PAS: 'Passage',
  PDT: 'Président',
  PL: 'Place',
  PR: 'Professeur',
  PRO: 'Promenade',
  PROM: 'Promenade',
  QU: 'Quartier',
  QUA: 'Quartier',
  RES: 'Résidence',
  RPT: 'Rond-point',
  RTE: 'Route',
  SEN: 'Sentier',
  SQ: 'Square',
  ST: 'Saint',
  STE: 'Sainte',
  VLA: 'Villa'
};

export const ABREVIATIONS_EN_TETE_DE_VOIE_SEULEMENT: ReadonlySet<string> = new Set(['AVE', 'PAS', 'PRO', 'QU']);

export const TYPES_DE_VOIE: string =
  'rue|avenue|boulevard|place|chemin|route|impasse|all[ée]e|quai|cours|square|passage|sentier|voie|faubourg|esplanade|promenade|villa|cit[ée]|hameau|lotissement|mail|rond[- ]point|traverse|venelle|clos|domaine|parvis';
