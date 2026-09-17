import { z } from 'zod';
import { defineModel, type Model } from '../model';

/**
 * Non vide, et rien de plus : ni longueur minimale ni maximale (D16.3). Les 36 noms de trois
 * caractères ou moins du jeu national sont presque tous des acronymes réels, et le plus long,
 * 138 caractères, désigne bien un lieu.
 *
 * Un nom fait d'espaces est un nom vide — `!== ''` ne suffisait pas à le dire — mais la valeur
 * n'est **pas** rognée pour autant. Retirer les espaces de bord est une réparation, que
 * `nettoyerNom` sait faire et que chaque consommateur applique s'il le veut (D16.1, D16.2) :
 * la validation constate, elle ne corrige pas.
 */
export const Nom = defineModel(
  z
    .string()
    .refine((nom: string): boolean => nom.trim() !== '', { error: 'Le nom ne doit pas être vide' })
    .brand('Nom')
);

export type Nom = Model.TypeOf<typeof Nom>;
