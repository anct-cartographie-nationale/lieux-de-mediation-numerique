import { Siret } from '../siret';

/**
 * L'immatriculation qui identifie la structure. Le RNA en faisait partie ; il en est sorti,
 * cinq lieux sur dix-huit mille sept cent soixante-neuf en portant un.
 *
 * Il ne reste donc qu'une immatriculation possible, et le pivot est le SIRET — pas un modèle
 * de plus qui redirait la même règle, au risque de s'en écarter.
 */
export const Pivot: typeof Siret = Siret;

export type Pivot = Siret;
