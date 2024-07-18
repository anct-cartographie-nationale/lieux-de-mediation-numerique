import { Model } from '../model';
import { FormationLabelError } from './errors';

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

export type FormationsLabels = Model<'FormationsLabels', FormationLabel[]>;

export type FormationLabelIndefini = 'Label de formation indéfini';

const firstInvalidFormationLabel = (formationLabel: FormationLabel): boolean =>
  !Object.values(FormationLabel).includes(formationLabel);

const throwFormationsLabelsError = (formationsLabels: FormationLabel[]): FormationsLabels => {
  throw new FormationLabelError(formationsLabels.find(firstInvalidFormationLabel) ?? 'Label de formation indéfini');
};

const isFormationsLabels = (formationsLabels: FormationLabel[]): formationsLabels is FormationsLabels =>
  formationsLabels.find(firstInvalidFormationLabel) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const FormationsLabels = (formationsLabels: FormationLabel[]): FormationsLabels =>
  isFormationsLabels(formationsLabels) ? formationsLabels : throwFormationsLabelsError(formationsLabels);
