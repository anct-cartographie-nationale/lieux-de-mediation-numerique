import { z } from 'zod';
import { defineModel, type Model } from '../model';

/**
 * L'E.164, et rien d'autre : une seule écriture possible d'un même numéro. La mise en forme
 * nationale — `01 02 03 04 05` — redevient ce qu'elle est, une affaire d'affichage.
 *
 * Les indicatifs sont ceux que le schéma national admet : métropole et outre-mer. Un numéro
 * étranger, fût-il valide, n'a pas sa place sur une cartographie française.
 */
const TELEPHONE_REG_EXP: RegExp = /^\+(?:33|262|269|508|590|594|596|681|687|689)\d{6,9}$/u;

export const Telephone = defineModel(
  z
    .string()
    .regex(TELEPHONE_REG_EXP, { error: 'Le téléphone doit être au format E.164 avec un indicatif français' })
    .brand('Telephone')
);

export type Telephone = Model.TypeOf<typeof Telephone>;
