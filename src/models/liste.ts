export const sansDoublons = <TValeur>(valeurs: TValeur[]): TValeur[] => Array.from(new Set(valeurs));

export const triee = <TValeur>(valeurs: TValeur[]): TValeur[] =>
  [...valeurs].sort((gauche: TValeur, droite: TValeur): number => String(gauche).localeCompare(String(droite), 'fr'));
