import { ratio } from 'fuzzball';

/**
 * Similarité entre deux chaînes, en pourcentage.
 *
 * `fuzzball` fournit la mesure de base : c'est celle qu'emploie déjà la
 * déduplication de mednum-cli, et une règle commune n'a de sens que si tous les
 * consommateurs mesurent la ressemblance de la même façon. La fonction n'est
 * délibérément pas injectable — ce serait rouvrir la porte qu'on cherche à
 * fermer.
 *
 * Le prétraitement de fuzzball est désactivé : la casse, les accents et la
 * ponctuation ont déjà été traités par la normalisation, qui va plus loin en
 * ramenant les préfixes administratifs à un jeton commun et en désabrégeant les
 * termes. Le lui laisser reviendrait à normaliser deux fois, selon deux règles
 * différentes.
 */

/**
 * Le ratio seul est PROPORTIONNEL : il rapporte les différences à la longueur
 * cumulée, si bien qu'un même écart pèse d'autant moins que le texte est long.
 * Des dénominations bâties sur un gabarit en tirent une ressemblance imméritée.
 *
 * Relevé dans les données : 175 lieux nommés « MOSELLE FIBRE ateliers organisés
 * à la Mairie de X ». Deux d'entre eux, qui n'ont en commun que le gabarit,
 * atteignent 79 % — une cinquantaine de caractères identiques noyant le seul
 * segment qui les distingue, la commune.
 *
 * On borne donc le ratio par une mesure ABSOLUE : au-delà d'un certain nombre de
 * caractères d'écart, deux textes sont différents quelle que soit leur longueur.
 * La retenue des deux protège les deux extrémités — le proportionnel empêche
 * deux textes courts et sans rapport de paraître proches, l'absolu empêche deux
 * textes longs et distincts de le paraître.
 */
const ECART_DECISIF_EN_CARACTERES: 20 = 20 as const;

/**
 * Distance d'indel, retrouvée depuis le ratio plutôt que recalculée : le ratio
 * de fuzzball en est la forme normalisée, `1 - d / (len1 + len2)`.
 */
const ecart = (proportionnel: number, longueurCumulee: number): number =>
  Math.round(((100 - proportionnel) * longueurCumulee) / 100);

const absolu = (ecartEnCaracteres: number): number =>
  Math.max(0, Math.round(100 * (1 - ecartEnCaracteres / (2 * ECART_DECISIF_EN_CARACTERES))));

export const similarite = (une: string, autre: string): number =>
  une.length + autre.length === 0
    ? 100
    : ((proportionnel: number): number => Math.min(proportionnel, absolu(ecart(proportionnel, une.length + autre.length))))(
        Math.round(ratio(une, autre, { full_process: false }))
      );
