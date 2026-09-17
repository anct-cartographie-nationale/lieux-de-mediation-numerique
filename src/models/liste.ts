/**
 * Dix champs du schéma sont des listes de valeurs d'une énumération, et aucun n'admet de
 * doublon : deux fois « Gratuit » ne dit rien de plus qu'une fois.
 */
export const sansDoublons = <TValeur>(valeurs: TValeur[]): TValeur[] => Array.from(new Set(valeurs));
