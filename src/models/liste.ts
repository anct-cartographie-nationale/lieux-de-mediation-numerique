export const sansDoublons = <TValeur>(valeurs: TValeur[]): TValeur[] => Array.from(new Set(valeurs));
