/**
 * Une règle de réparation : un motif qui reconnaît une valeur à corriger, et la correction.
 *
 * Réparer n'est pas normaliser. Ces règles rendent une valeur **publiable**, en préservant son
 * sens ; `normaliserNom` et `normaliserAdresse`, dans `deduplication`, fabriquent au contraire
 * une clé de comparaison destructrice qui n'est jamais publiée. Les deux familles portent des
 * verbes distincts pour que personne n'ait à deviner laquelle il appelle.
 */
export type RegleDeNettoyage = {
  nom: string;
  selecteur: RegExp;
  /** Applique la correction quand le sélecteur ne reconnaît **pas** la valeur. */
  negation?: boolean;
  corriger: (aCorriger: string) => string;
};

/**
 * Le sélecteur est reconstruit pour garantir le drapeau `u` et écarter `g` et `y`, dont l'état
 * interne fausserait un `test` répété. Les autres drapeaux — `i` au premier chef — sont
 * conservés : les perdre a déjà rendu muettes des règles qui semblaient pourtant écrites.
 */
const drapeaux = (selecteur: RegExp): string =>
  `${selecteur.flags.replace(/[gy]/gu, '')}${selecteur.flags.includes('u') ? '' : 'u'}`;

const reconnait = (regle: RegleDeNettoyage, valeur: string): boolean =>
  new RegExp(regle.selecteur.source, drapeaux(regle.selecteur)).test(valeur);

const doitCorriger = (regle: RegleDeNettoyage, valeur: string): boolean =>
  regle.negation === true ? !reconnait(regle, valeur) : reconnait(regle, valeur);

/** Applique une règle si elle reconnaît la valeur, sinon rend la valeur inchangée. */
export const appliquerRegle = (valeur: string, regle: RegleDeNettoyage): string =>
  doitCorriger(regle, valeur) ? regle.corriger(valeur) : valeur;

/** Enchaîne les règles dans l'ordre, chacune travaillant sur le résultat de la précédente. */
export const appliquerRegles = (regles: readonly RegleDeNettoyage[], valeur: string): string =>
  regles.reduce(appliquerRegle, valeur);
