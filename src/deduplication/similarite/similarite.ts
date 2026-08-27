import { ratio } from 'fuzzball';

const ECART_DECISIF_EN_CARACTERES: 20 = 20 as const;

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
