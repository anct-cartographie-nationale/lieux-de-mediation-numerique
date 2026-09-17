import { Typologie } from '../../models/typologie';

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

export const enCasseNaturelle = (denomination: string): string =>
  TOUT_EN_CAPITALES.test(denomination) ? denomination.split(' ').map(enCasseDeMot).join(' ') : denomination;
