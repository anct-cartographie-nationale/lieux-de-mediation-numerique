import { z } from 'zod';
import { defineModel, type Model } from '../model';

const JOUR = 'Mo|Tu|We|Th|Fr|Sa|Su|PH';
const PLAGE = '(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d';

const COMMENTAIRE = '(?:\\s+"[^"]*")?';
const REGLE = `(?:${JOUR})(?:[-,](?:${JOUR}))*\\s+(?:${PLAGE}(?:,${PLAGE})*|off)${COMMENTAIRE}`;

const SEMAINE = '(?:week\\s+\\d{1,2}-\\d{1,2}\\/\\d\\s+)?';

const HORAIRES_REG_EXP: RegExp = new RegExp(`^(?:24/7|${SEMAINE}${REGLE}(?:\\s*;\\s*${REGLE})*)(?:\\s*"[^"]*")?$`, 'u');

export const Horaires = defineModel(
  z.string().regex(HORAIRES_REG_EXP, { error: 'Les horaires ne suivent pas le format OpenStreetMap' }).brand('Horaires')
);

export type Horaires = Model.TypeOf<typeof Horaires>;
