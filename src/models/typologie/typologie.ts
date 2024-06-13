/* eslint-disable @typescript-eslint/naming-convention */

import { Model } from '../model';
import { TypologiesError } from './errors';

export enum Typologie {
  ACI = 'ACI',
  ACIPHC = 'ACIPHC',
  AFPA = 'AFPA',
  AI = 'AI',
  ASE = 'ASE',
  ASSO = 'ASSO',
  ASSO_CHOMEUR = 'ASSO_CHOMEUR',
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
  CDAS = 'CDAS',
  CFP = 'CFP',
  CHRS = 'CHRS',
  CHU = 'CHU',
  CIAS = 'CIAS',
  CIDFF = 'CIDFF',
  CITMET = 'CITMET',
  CMP = 'CMP',
  CMS = 'CMS',
  CPAM = 'CPAM',
  CPH = 'CPH',
  CS = 'CS',
  CSAPA = 'CSAPA',
  CSC = 'CSC',
  DEETS = 'DEETS',
  DEPT = 'DEPT',
  DIPLP = 'DIPLP',
  E2C = 'E2C',
  EA = 'EA',
  EATT = 'EATT',
  EI = 'EI',
  EITI = 'EITI',
  ENM = 'ENM',
  EPCI = 'EPCI',
  EPI = 'EPI',
  EPIDE = 'EPIDE',
  EPN = 'EPN',
  ES = 'ES',
  ESS = 'ESS',
  ETTI = 'ETTI',
  EVS = 'EVS',
  FABLAB = 'FABLAB',
  FAIS = 'FAIS',
  FT = 'FT',
  GEIQ = 'GEIQ',
  HUDA = 'HUDA',
  LA_POSTE = 'LA_POSTE',
  MDE = 'MDE',
  MDEF = 'MDEF',
  MDPH = 'MDPH',
  MDS = 'MDS',
  MJC = 'MJC',
  ML = 'ML',
  MQ = 'MQ',
  MSA = 'MSA',
  MSAP = 'MSAP',
  MUNI = 'MUNI',
  OACAS = 'OACAS',
  ODC = 'ODC',
  OF = 'OF',
  OIL = 'OIL',
  OPCS = 'OPCS',
  PAD = 'PAD',
  PE = 'PE',
  PENSION = 'PENSION',
  PI = 'PI',
  PIJ_BIJ = 'PIJ_BIJ',
  PIMMS = 'PIMMS',
  PJJ = 'PJJ',
  PLIE = 'PLIE',
  PREF = 'PREF',
  PREVENTION = 'PREVENTION',
  REG = 'REG',
  RESSOURCERIE = 'RESSOURCERIE',
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
