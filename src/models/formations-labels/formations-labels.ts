import { Model } from '../model';
import { FormationsLabelsError } from './errors';

export enum FormationLabel {
  FormeAEspaceSante = 'Formé à « Mon Espace Santé »',
  FormeADuplex = 'Formé à « DUPLEX » (illetrisme)',
  ArniaMedNumBFC = 'Arnia/MedNum BFC (Bourgogne-Franche-Comté)',
  CollectifRessourcesEtActeursReemploi = 'Collectif ressources et acteurs réemploi (Normandie)',
  FabriquesDeTerritoire = 'Fabriques de Territoire',
  LesEclaireursDuNumerique = 'Les Éclaireurs du numérique (Drôme)',
  MesPapiers = 'Mes Papiers (Métropole de Lyon)',
  Ordi = 'ORDI 3.0',
  SudLabs = 'SUD LABS (PACA)'
}

export type FormationsLabels = Model<'FormationsLabels', FormationLabel[]>;

export type FormationLabelIndefini = 'formation ou label indéfini';

const firstInvalidFormationLabel = (formationLabel: FormationLabel): boolean =>
  !Object.values(FormationLabel).includes(formationLabel);

const throwFormationsLabelsError = (formationsLabels: FormationLabel[]): FormationsLabels => {
  throw new FormationsLabelsError(formationsLabels.find(firstInvalidFormationLabel) ?? 'formation ou label indéfini');
};

const isFormationsLabels = (formationsLabels: FormationLabel[]): formationsLabels is FormationsLabels =>
  formationsLabels.find(firstInvalidFormationLabel) == null;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export const FormationsLabels = (formationsLabels: FormationLabel[]): FormationsLabels =>
  isFormationsLabels(formationsLabels) ? formationsLabels : throwFormationsLabelsError(formationsLabels);
