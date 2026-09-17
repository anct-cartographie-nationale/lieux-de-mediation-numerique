import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { dansUneEmpriseFrancaise, estInverse } from './emprises';

export const Latitude = defineModel(z.number().min(-90).max(90).brand('Latitude'));

export type Latitude = Model.TypeOf<typeof Latitude>;

export const Longitude = defineModel(z.number().min(-180).max(180).brand('Longitude'));

export type Longitude = Model.TypeOf<typeof Longitude>;

export const Localisation = defineModel(
  z
    .object({ latitude: Latitude.schema, longitude: Longitude.schema })
    .refine(
      ({ latitude, longitude }: { latitude: number; longitude: number }): boolean =>
        dansUneEmpriseFrancaise(latitude, longitude),
      {
        error: (issue: { input: unknown }): string =>
          estInverse((issue.input as { latitude: number }).latitude, (issue.input as { longitude: number }).longitude)
            ? 'Les coordonnées semblent inversées : échangées, elles tombent sur le territoire français'
            : 'Les coordonnées doivent tomber sur le territoire français'
      }
    )
    .brand('Localisation')
);

export type LocalisationToValidate = Model.InputOf<typeof Localisation>;

export type Localisation = Model.TypeOf<typeof Localisation>;
