export type RegleDeNettoyage = {
  nom: string;
  selecteur: RegExp;

  negation?: boolean;
  corriger: (aCorriger: string) => string;
};

const drapeaux = (selecteur: RegExp): string =>
  `${selecteur.flags.replace(/[gy]/gu, '')}${selecteur.flags.includes('u') ? '' : 'u'}`;

const reconnait = (regle: RegleDeNettoyage, valeur: string): boolean =>
  new RegExp(regle.selecteur.source, drapeaux(regle.selecteur)).test(valeur);

const doitCorriger = (regle: RegleDeNettoyage, valeur: string): boolean =>
  regle.negation === true ? !reconnait(regle, valeur) : reconnait(regle, valeur);

export const appliquerRegle = (valeur: string, regle: RegleDeNettoyage): string =>
  doitCorriger(regle, valeur) ? regle.corriger(valeur) : valeur;

export const appliquerRegles = (regles: readonly RegleDeNettoyage[], valeur: string): string =>
  regles.reduce(appliquerRegle, valeur);
