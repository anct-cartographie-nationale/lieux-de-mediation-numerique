export type Presentation = {
  resume?: string;
  detail?: string;
};

/** La longueur du résumé, telle que la carte du lieu l'affiche. */
export const RESUME_LONGUEUR_MAXIMALE = 280;

export const isValidResume = (resume?: string): boolean => resume == null || resume.length <= RESUME_LONGUEUR_MAXIMALE;
