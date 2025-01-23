import { Model } from '../model';
import { TypologiesError } from './errors';

export enum Typologie {
  ACI = 'ACI', // Structures porteuses d’ateliers et chantiers d’insertion
  ACIPHC = 'ACIPHC', // SIAE — Atelier chantier d’insertion premières heures en chantier
  AFPA = 'AFPA', // Agence nationale pour la formation professionnelle des adultes
  AI = 'AI', // Associations intermédiaires
  ASE = 'ASE', // Aide sociale à l’enfance
  ASSO = 'ASSO', // Associations
  ASSO_CHOMEUR = 'ASSO_CHOMEUR', // Associations de chômeurs
  AUTRE = 'Autre', // Autre
  AVIP = 'AVIP', // Crèche à vocation d'insertion professionnelle
  BIB = 'BIB', // Bibliothèque / Médiathèque
  CAARUD = 'CAARUD', // Centre d'accueil et d'accompagnement à la réduction de risques pour usagers de drogues
  CADA = 'CADA', // Centres d’accueil de demandeurs d’asile
  CAF = 'CAF', // Caisses d’allocation familiale
  CAP_EMPLOI = 'CAP_EMPLOI', // Cap Emploi
  CAVA = 'CAVA', // Centres d’adaptation à la vie active
  CC = 'CC', // Communautés de Commune
  CCAS = 'CCAS', // Centres communaux d’action sociale
  CCONS = 'CCONS', // Chambres consulaires
  CD = 'CD', // Conseils Départementaux
  CDAS = 'CDAS', // Centre départemental d'action sociale
  CFP = 'CFP', // Centre des finances publiques
  CHRS = 'CHRS', // Centres d’hébergement et de réinsertion sociale
  CHU = 'CHU', // Centres d’hébergement d’urgence
  CIAS = 'CIAS', // Centres intercommunaux d’action sociale
  CIDFF = 'CIDFF', // Centres d’information sur les droits des femmes et des familles
  CITMET = 'CITMET', // Cité des métiers
  CMP = 'CMP', // Centre Médico Psychologique
  CMS = 'CMS', // Centre médico-social
  CPAM = 'CPAM', // Caisse primaire d'assurance maladie
  CPH = 'CPH', // Centres provisoires d’hébergement
  CS = 'CS', // Centre social
  CSAPA = 'CSAPA', // - Centre de soins, d'accompagnement et de prévention en addictologie
  CSC = 'CSC', // Centre socioculturel
  DEETS = 'DEETS', // Directions de l’Economie, de l’Emploi, du Travail et des Solidarités
  DEPT = 'DEPT', // Services sociaux du Conseil départemental
  DIPLP = 'DIPLP', // Délégation interministérielle à la prévention et à la lutte contre la pauvreté
  E2C = 'E2C', // École de la deuxième chance
  EA = 'EA', // Entreprise adaptée
  EATT = 'EATT', // Entreprise adaptée
  EI = 'EI', // Entreprises d’insertion
  EITI = 'EITI', // Entreprises d’insertion par le travail indépendant
  ENM = 'ENM', // Espace Numérique Mobile
  EPCI = 'EPCI', // Intercommunalité
  EPI = 'EPI', // Espace Public Internet
  EPIDE = 'EPIDE', // Établissement pour l'insertion dans l'emploi
  EPN = 'EPN', // Espace publique numérique
  ES = 'ES', // Épicerie solidaire
  ESAT = 'ESAT', // Établissements ou services d'aide par le travail
  ESS = 'ESS', // Entreprise def l'Économie Sociale et Solidaire
  ETTI = 'ETTI', // Entreprises de travail temporaire d’insertion
  EVS = 'EVS', // Espace de vie sociale
  FABLAB = 'FABLAB', // Fablab
  FABRIQUE = 'FABRIQUE', // Fabrique
  FAIS = 'FAIS', // Fédérations d’acteurs de l’insertion et de la solidarité
  FT = 'FT', // France travail
  GEIQ = 'GEIQ', // Groupements d’employeurs pour l’insertion et la qualification
  HUDA = 'HUDA', // Hébergement d'urgence pour demandeurs d'asile
  LA_POSTE = 'LA_POSTE', // La Poste
  MDE = 'MDE', // Maison de l'emploi
  MDH = 'MDH', // Maison des Habitants
  MDEF = 'MDEF', // Maison de l'emploi et de la formation
  MDPH = 'MDPH', // Maison Départementale des Personnes Handicapées
  MDS = 'MDS', // Maison Départementale des Solidarités
  MJC = 'MJC', // Maison des jeunes et de la culture
  ML = 'ML', // Mission Locale
  MQ = 'MQ', // Maison de quartier
  MSA = 'MSA', // Mutualité Sociale Agricole
  MSAP = 'MSAP', // Maison de Services Au Public
  MUNI = 'MUNI', // Municipalités
  OACAS = 'OACAS', // Structures agréées Organisme d’accueil communautaire et d’activité solidaire
  ODC = 'ODC', // Organisation délégataire d'un CD
  OF = 'OF', // Organisme de formations
  OIL = 'OIL', // Opérateur d'intermédiation locative
  OPCS = 'OPCS', // Organisation porteuse de la clause sociale
  PAD = 'PAD', // Point d'Accès au Droit
  PENSION = 'PENSION', // Pension de famille
  PI = 'PI', // Point info
  PIJ_BIJ = 'PIJ_BIJ', // Points et bureaux information jeunesse
  PIMMS = 'PIMMS', // Point Information Médiation Multi Services
  PJJ = 'PJJ', // Protection judiciaire de la jeunesse
  PLIE = 'PLIE', // Plans locaux pour l’insertion et l’emploi
  PREF = 'PREF', // Préfecture, Sous-Préfecture
  PREVENTION = 'PREVENTION', // Service ou club de prévention
  REG = 'REG', // Région
  RELAIS_LECTURE = 'RELAIS_LECTURE', // Relais lecture
  RESSOURCERIE = 'RESSOURCERIE', // Ressourcerie
  RFS = 'RFS', // Réseau France Services
  RS_FJT = 'RS_FJT', // Résidence sociale - Foyer de Jeunes Travailleurs
  SCP = 'SCP', // Services et clubs de prévention
  SPIP = 'SPIP', // Services pénitentiaires d’insertion et de probation
  TIERS_LIEUX = 'TIERS_LIEUX', // Tiers lieu & coworking
  UDAF = 'UDAF' // Union Départementale d’Aide aux Familles
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
