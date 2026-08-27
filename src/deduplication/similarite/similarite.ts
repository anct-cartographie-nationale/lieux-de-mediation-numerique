import { ratio } from 'fuzzball';

/**
 * Similarité entre deux chaînes, en pourcentage.
 *
 * `fuzzball` fournit la mesure : c'est celle qu'emploie déjà la déduplication de
 * mednum-cli, et une règle commune n'a de sens que si tous les consommateurs
 * mesurent la ressemblance de la même façon. La fonction n'est délibérément pas
 * injectable — ce serait rouvrir la porte qu'on cherche à fermer.
 *
 * Le prétraitement de fuzzball est désactivé : la casse, les accents et la
 * ponctuation ont déjà été traités par la normalisation, qui va plus loin en
 * ramenant les préfixes administratifs à un jeton commun. Le lui laisser
 * reviendrait à normaliser deux fois, selon deux règles différentes.
 */
export const similarite = (une: string, autre: string): number =>
  une.length + autre.length === 0 ? 100 : Math.round(ratio(une, autre, { full_process: false }));
