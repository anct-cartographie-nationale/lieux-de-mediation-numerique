/**
 * Similarité entre deux chaînes, en pourcentage.
 *
 * Le calcul est celui de la distance d'indel normalisée — les insertions et
 * suppressions nécessaires pour passer d'une chaîne à l'autre, rapportées à leur
 * longueur cumulée. C'est la même mesure que le `ratio` de fuzzball, à ceci près
 * qu'elle est écrite ici : la bibliothèque n'a aucune dépendance de production,
 * et surtout une règle de dédoublonnage commune n'a de sens que si tous les
 * consommateurs mesurent la ressemblance de la même façon. Une fonction
 * injectable rouvrirait la porte qu'on cherche à fermer.
 */

const ligneSuivante =
  (precedente: number[], caractere: string) =>
  (courante: number[], caractereCible: string, index: number): number[] => [
    ...courante,
    caractere === caractereCible ? (precedente[index] ?? 0) + 1 : Math.max(courante[index] ?? 0, precedente[index + 1] ?? 0)
  ];

/** Longueur de la plus longue sous-séquence commune, ligne de programmation dynamique par ligne. */
const sousSequenceCommune = (une: string, autre: string): number =>
  [...une].reduce(
    (precedente: number[], caractere: string): number[] => [...autre].reduce(ligneSuivante(precedente, caractere), [0]),
    new Array<number>(autre.length + 1).fill(0)
  )[autre.length] ?? 0;

export const similarite = (une: string, autre: string): number =>
  une.length + autre.length === 0 ? 100 : Math.round((200 * sousSequenceCommune(une, autre)) / (une.length + autre.length));
