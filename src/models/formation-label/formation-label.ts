import { z } from 'zod';
import { defineModel, type Model } from '../model';
import { sansDoublons } from '../liste';

export enum FormationLabel {
  FormeAMonEspaceSante = 'Formé à « Mon Espace Santé »',
  FormeADuplex = 'Formé à « DUPLEX » (illettrisme)',
  ArniaMednum = 'Arnia/MedNum BFC (Bourgogne-Franche-Comté)',
  CollectifRessourcesEtActeursReemploi = 'Collectif ressources et acteurs réemploi (Normandie)',
  EtapesNumeriques = 'Étapes numériques (La Poste)',
  FabriquesDeTerritoire = 'Fabriques de Territoire',
  LesEclaireurs = 'Les Éclaireurs du numérique (Drôme)',
  MesPapiers = 'Mes Papiers (Métropole de Lyon)',
  Ordi3 = 'ORDI 3.0',
  SudLabs = 'SUD LABS (PACA)'
}

export const FormationsLabels = defineModel(z.array(z.enum(FormationLabel)).transform(sansDoublons).brand('FormationsLabels'));

export type FormationsLabels = Model.TypeOf<typeof FormationsLabels>;
