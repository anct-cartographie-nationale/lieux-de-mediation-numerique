import type { Model } from '../model';
import { HorairesError } from './errors';

export type Horaires = Model<'Horaires', string>;

/**
 * Les horaires au format `opening_hours` d'OpenStreetMap.
 *
 * C'était le seul champ du modèle laissé en chaîne nue, sans aucune validation — et le jeu
 * national en porte les traces : 662 valeurs sur 8654 sont invalides, dont 551 franchement
 * corrompues, avec des `:undefined-17:00` où le mot `undefined` de JavaScript a fui dans une
 * donnée publique, et 111 qui écrivent `Sun` là où OSM écrit `Su`.
 */
const JOUR = 'Mo|Tu|We|Th|Fr|Sa|Su|PH';
const PLAGE = '(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d';
const REGLE = `(?:${JOUR})(?:[-,](?:${JOUR}))*\\s+(?:${PLAGE}(?:,${PLAGE})*|off)`;

/** Le préfixe de semaine paire ou impaire, que le standard admet et que les sources emploient. */
const SEMAINE = '(?:week\\s+\\d{1,2}-\\d{1,2}\\/\\d\\s+)?';

const HORAIRES_REG_EXP: RegExp = new RegExp(`^(?:24/7|${SEMAINE}${REGLE}(?:\\s*;\\s*${REGLE})*)(?:\\s*"[^"]*")?$`, 'u');

export const isValidHoraires = (horaires: string): horaires is Horaires => HORAIRES_REG_EXP.test(horaires);

const throwHorairesError = (horaires: string): Horaires => {
  throw new HorairesError(horaires);
};

export const Horaires = (horaires: string): Horaires => (isValidHoraires(horaires) ? horaires : throwHorairesError(horaires));
