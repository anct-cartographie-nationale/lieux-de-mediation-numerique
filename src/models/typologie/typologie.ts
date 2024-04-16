/* eslint-disable @typescript-eslint/naming-convention */

import { Model } from '../model';
import { TypologiesError } from './errors';

export enum Typologie {
  ACI = 'ACI',
  ACIPHC = 'ACIPHC',
  AFPA = 'AFPA',
  AI = 'AI',
  ASE = 'ASE',
  ASSO_CHOMEUR = 'ASSO_CHOMEUR',
  ASSO = 'ASSO',
  AUTRE = 'Autre',
  AVIP = 'AVIP',
  BIB = 'BIB',
  CAARUD = 'CAARUD',
  CADA = 'CADA',
  CAF = 'CAF',
  CAP_EMPLOI = 'CAP_EMPLOI',
  CAVA = 'CAVA',
  CC = 'CC',
  CCAS = 'CCAS',
  CCONS = 'CCONS',
  CD = 'CD',
  CHRS = 'CHRS',
  CHU = 'CHU',
  CIAS = 'CIAS',
  CIDFF = 'CIDFF',
  CITMET = 'CITMET',
  CPH = 'CPH',
  CS = 'CS',
  CSAPA = 'CSAPA',
  DEETS = 'DEETS',
  DEPT = 'DEPT',
  DIPLP = 'DIPLP',
  E2C = 'E2C',
  EA = 'EA',
  EATT = 'EATT',
  EI = 'EI',
  EITI = 'EITI',
  EPCI = 'EPCI',
  EPIDE = 'EPIDE',
  ESS = 'ESS',
  ETTI = 'ETTI',
  FAIS = 'FAIS',
  GEIQ = 'GEIQ',
  HUDA = 'HUDA',
  MDE = 'MDE',
  MDEF = 'MDEF',
  MDPH = 'MDPH',
  MDS = 'MDS',
  MJC = 'MJC',
  ML = 'ML',
  MQ = 'MQ',
  MSA = 'MSA',
  MUNI = 'MUNI',
  OACAS = 'OACAS',
  ODC = 'ODC',
  OF = 'OF',
  OIL = 'OIL',
  OPCS = 'OPCS',
  PAD = 'PAD',
  PE = 'PE',
  PENSION = 'PENSION',
  PIJ_BIJ = 'PIJ_BIJ',
  PIMMS = 'PIMMS',
  PJJ = 'PJJ',
  PLIE = 'PLIE',
  PREF = 'PREF',
  PREVENTION = 'PREVENTION',
  REG = 'REG',
  RFS = 'RFS',
  RS_FJT = 'RS_FJT',
  SCP = 'SCP',
  SPIP = 'SPIP',
  TIERS_LIEUX = 'TIERS_LIEUX',
  UDAF = 'UDAF'
}

export type Typologies = Model<'Typologies', Typologie[]>;

export type TypologiesIndefinie = 'typologie indéfinie';

const firstInvalidTypology = (typologie: Typologie): boolean => !Object.values(Typologie).includes(typologie);

const throwTypologiesError = (typologies: Typologie[]): Typologies => {
  throw new TypologiesError(typologies.find(firstInvalidTypology) ?? 'typologie indéfinie');
};

const isTypologies = (typologies: Typologie[]): typologies is Typologies => typologies.find(firstInvalidTypology) == null;

export const Typologies = (typologies: Typologie[]): Typologies =>
  isTypologies(typologies) ? typologies : throwTypologiesError(typologies);
