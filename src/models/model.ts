/**
 * La marque d'un modèle validé.
 *
 * `declare const` sans définition : ce symbole n'existe **que** dans le système de types. Rien
 * ne peut le lire à l'exécution, et il n'est pas exporté, donc rien ne peut le fabriquer hors
 * d'ici.
 *
 * La version précédente marquait avec une propriété ordinaire — `Model<'Siret', string>` valait
 * `string & { isSiret: true }`. Le type promettait donc un champ `isSiret` valant `true`,
 * qu'aucun constructeur ne posait : `Siret('435…').isSiret` se typait en `true` et rendait
 * `undefined`. Ce mensonge se payait en `Omit<Adresse, 'isAdresse'>`, écrit partout où il
 * fallait décrire la forme réelle d'une adresse.
 */
declare const marqueDeModele: unique symbol;

/**
 * Une valeur dont on sait qu'elle a passé la validation de son modèle.
 *
 * La marque est **fantôme** : elle ne change ni la représentation, ni `Object.keys`, ni ce que
 * `JSON.stringify` écrit. Un `Siret` reste une chaîne, une `Adresse` reste l'objet qu'on lit.
 * Elle n'ajoute qu'une chose, et c'est tout ce qu'on lui demande : l'impossibilité de faire
 * passer une valeur quelconque pour un modèle sans être passé par son constructeur.
 */
export type Model<TName extends string, TValues> = TValues & { readonly [marqueDeModele]: TName };
