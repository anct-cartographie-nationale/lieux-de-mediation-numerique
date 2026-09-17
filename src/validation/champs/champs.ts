import { z } from 'zod';
import { isValidCodeInsee, isValidCodePostal, isValidCommune, isValidVoie } from '../../models/adresse';
import type { Courriel } from '../../models/courriel';
import { isValidCourriel } from '../../models/courriel';
import type { Horaires } from '../../models/horaires';
import { isValidHoraires } from '../../models/horaires';
import type { Id } from '../../models/id';
import { isValidId } from '../../models/id';
import type { Localisation } from '../../models/localisation';
import { isValidLocalisation } from '../../models/localisation';
import type { Nom } from '../../models/nom';
import { isValidNom } from '../../models/nom';
import type { Pivot } from '../../models/pivot';
import type { Presentation } from '../../models/presentation';
import { RESUME_LONGUEUR_MAXIMALE } from '../../models/presentation';
import type { Siret } from '../../models/siret';
import { isSiret } from '../../models/siret';
import { isValidTelephone } from '../../models/contact';
import type { Url } from '../../models/url';
import { isValidUrl } from '../../models/url';
import { isValidFicheAccesLibre } from '../../models/fiche-acces-libre';

export const SiretSchema: z.ZodType<Siret> = z
  .string()
  .refine(isSiret, { error: 'Le SIRET doit être composé de 14 chiffres et respecter sa clé de contrôle' });

export const PivotSchema: z.ZodType<Pivot> = SiretSchema;

export const IdSchema: z.ZodType<Id> = z
  .string()
  .refine(isValidId, { error: "L'identifiant ne doit être ni vide ni porteur d'un caractère à échapper" });

export const NomSchema: z.ZodType<Nom> = z.string().refine(isValidNom, { error: 'Le nom ne doit pas être vide' });

export const CourrielSchema: z.ZodType<Courriel> = z
  .string()
  .refine(isValidCourriel, { error: "L'adresse électronique n'est pas reconnue" });

export const UrlSchema: z.ZodType<Url> = z.string().refine(isValidUrl, { error: "L'adresse doit être en http ou https" });

export const FicheAccesLibreSchema: z.ZodType<Url> = z
  .string()
  .refine(isValidFicheAccesLibre, { error: 'La fiche doit être une fiche Accès Libre (https://acceslibre.beta.gouv.fr/…)' });

export const TelephoneSchema: z.ZodType<string> = z
  .string()
  .refine(isValidTelephone, { error: 'Le téléphone doit être au format E.164 avec un indicatif français' });

export const HorairesSchema: z.ZodType<Horaires> = z
  .string()
  .refine(isValidHoraires, { error: 'Les horaires ne suivent pas le format OpenStreetMap' });

export const AdresseSchema = z.object({
  voie: z.string().refine(isValidVoie, { error: "La voie n'est pas reconnue" }),
  complement_adresse: z.string().optional(),
  code_postal: z.string().refine(isValidCodePostal, { error: 'Le code postal doit être composé de 5 chiffres' }),
  code_insee: z
    .string()
    .refine(isValidCodeInsee, { error: 'Le code INSEE ne suit pas le code officiel géographique' })
    .optional(),
  commune: z.string().refine(isValidCommune, { error: "Le nom de commune n'est pas reconnu" })
});

export const LocalisationSchema: z.ZodType<Localisation> = z
  .object({ latitude: z.number(), longitude: z.number() })
  .refine((localisation) => isValidLocalisation({ ...localisation }), {
    error: 'Les coordonnées doivent tomber sur le territoire français'
  }) as unknown as z.ZodType<Localisation>;

export type PresentationSaisie = { [C in keyof Presentation]: Presentation[C] | undefined };

export const PresentationSchema: z.ZodType<PresentationSaisie> = z.object({
  resume: z
    .string()
    .max(RESUME_LONGUEUR_MAXIMALE, { error: `Le résumé doit faire au plus ${RESUME_LONGUEUR_MAXIMALE} caractères` })
    .optional(),
  detail: z.string().optional()
});
