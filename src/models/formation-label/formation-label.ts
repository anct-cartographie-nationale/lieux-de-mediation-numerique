import type { Model } from '../model';
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

/**
 * Les doublons tombent à la construction. La bibliothèque ne dédupliquait que `Services` et
 * `ModalitesAccompagnement` — un écart qui ne tenait qu'à l'ordre dans lequel les modèles ont
 * été écrits, et qui finissait par surprendre.
 */
export const FormationsLabels = (formationsLabels: FormationLabel[]): FormationsLabels => {
  const sansDoublons: FormationLabel[] = Array.from(new Set(formationsLabels));

  return isFormationsLabels(sansDoublons) ? (sansDoublons as FormationsLabels) : throwFormationsLabelsError(formationsLabels);
};
