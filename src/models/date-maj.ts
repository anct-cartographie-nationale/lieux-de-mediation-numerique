/**
 * La date déclarée par le producteur, quand elle est lisible.
 *
 * 559 lieux du jeu national publiaient `1970-01-01` : le repli `new Date(0)` d'une
 * transformation qui n'avait su lire aucun format — dont trois sources entières. C'est la
 * sentinelle du pivot sous un autre nom, une valeur qui affirme quelque chose de faux plutôt
 * que d'avouer une absence.
 *
 * `new Date('pas une date')` ne lève pas : elle rend un `Date` dont le temps est `NaN`, qui se
 * range sans bruit dans un champ typé `Date` et ne se trahit qu'au moment de le sérialiser —
 * `toISOString` lève alors une `RangeError`, très loin de la donnée fautive. Une date illisible
 * devient donc ici une date **absente**.
 */
export const dateMajSiLisible = (dateMaj?: Date | string | null): { date_maj?: Date } => {
  if (dateMaj == null) return {};

  const date: Date = dateMaj instanceof Date ? dateMaj : new Date(dateMaj);

  return Number.isNaN(date.getTime()) ? {} : { date_maj: date };
};
