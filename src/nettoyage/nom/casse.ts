import { Typologie } from '../../models/typologie';

/** Les mots qui ne prennent pas de capitale au milieu d'une dénomination. */
const MOTS_OUTILS: ReadonlySet<string> = new Set([
  'a',
  'au',
  'aux',
  'chez',
  'dans',
  'de',
  'des',
  'du',
  'en',
  'et',
  'la',
  'le',
  'les',
  'lès',
  'par',
  'pour',
  'sous',
  'sur',
  'un',
  'une'
]);

/**
 * Les sigles que le domaine connaît : les codes de typologie du schéma national.
 *
 * Il n'existe **aucune heuristique fiable** pour distinguer un sigle d'un mot court. `CCAS`,
 * `MJC` et `EPN` en sont, mais `LYON`, `ELOI` et `AMIS` n'en sont pas, et rien dans leur forme
 * ne les sépare — ni la longueur, ni la présence de voyelles. Une liste explicite est le seul
 * moyen honnête ; celle du schéma est déjà là et fait autorité sur ce domaine.
 */
const SIGLES_CONNUS: ReadonlySet<string> = new Set(Object.values(Typologie).map((code: string): string => code.toUpperCase()));

const capitaliser = (mot: string): string =>
  mot.length === 0 ? mot : `${mot[0]?.toUpperCase() ?? ''}${mot.slice(1).toLowerCase()}`;

const enCasseDeFragment = (fragment: string, rang: number): string =>
  rang > 0 && MOTS_OUTILS.has(fragment.toLowerCase()) ? fragment.toLowerCase() : capitaliser(fragment);

const enCasseDeMot = (mot: string, rang: number): string => {
  if (SIGLES_CONNUS.has(mot.toUpperCase())) return mot.toUpperCase();
  if (rang > 0 && MOTS_OUTILS.has(mot.toLowerCase())) return mot.toLowerCase();

  return mot.split('-').map(enCasseDeFragment).join('-');
};

const TOUT_EN_CAPITALES: RegExp = /^[^\p{Ll}]*\p{Lu}[^\p{Ll}]*$/u;

/**
 * Une dénomination écrite tout en capitales, rendue à une casse lisible. Les sigles connus du
 * schéma sont préservés ; tout le reste passe en casse de titre.
 *
 * **Cette fonction n'est appliquée nulle part d'office.** Changer la casse d'un nom, c'est
 * réécrire ce qu'un producteur a déclaré : à chaque consommateur de décider s'il le veut.
 *
 * Une dénomination qui porte déjà des minuscules est rendue telle quelle : on ne corrige que ce
 * qui est manifestement resté en capitales, jamais un choix typographique délibéré.
 *
 * **Limite assumée :** un sigle absent de la liste — `ADF`, `SJT` — sera capitalisé comme un
 * mot. C'est le prix d'une règle qui ne devine pas.
 */
export const enCasseNaturelle = (denomination: string): string =>
  TOUT_EN_CAPITALES.test(denomination) ? denomination.split(' ').map(enCasseDeMot).join(' ') : denomination;
