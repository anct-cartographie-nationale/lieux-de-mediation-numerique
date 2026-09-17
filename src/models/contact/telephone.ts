import { type CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';
import { defineModel, type Model } from '../model';

const TERRITOIRES_FRANCAIS: ReadonlySet<CountryCode> = new Set<CountryCode>([
  'FR',
  'GF',
  'GP',
  'MQ',
  'YT',
  'RE',
  'BL',
  'MF',
  'PM',
  'NC',
  'PF',
  'WF'
]);

const estUnTelephoneFrancais = (telephone: string): boolean => {
  const analyse = parsePhoneNumberFromString(telephone);

  return (
    analyse?.isValid() === true &&
    analyse.number === telephone &&
    analyse.country != null &&
    TERRITOIRES_FRANCAIS.has(analyse.country)
  );
};

export const Telephone = defineModel(
  z
    .string()
    .refine(estUnTelephoneFrancais, {
      error: 'Le téléphone doit être un numéro français valide, écrit en E.164'
    })
    .brand('Telephone')
);

export type Telephone = Model.TypeOf<typeof Telephone>;
