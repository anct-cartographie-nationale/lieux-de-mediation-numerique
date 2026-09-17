import { appliquerRegles, type RegleDeNettoyage } from '../regle';

const RETOUR_A_LA_LIGNE: RegleDeNettoyage = {
  nom: 'retour à la ligne',
  selecteur: /\n/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\n/u, '')
};

const DEUX_POINTS_APRES_WWW: RegleDeNettoyage = {
  nom: 'deux points au lieu du point après www',
  selecteur: /www:/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/www:/gu, 'www.')
};

/** Le schéma national sépare les adresses multiples par une barre verticale. */
const SEPARATEUR_INATTENDU: RegleDeNettoyage = {
  nom: 'séparateur inattendu entre adresses',
  selecteur: /;|\s(?:ou|\/|;)\s/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/;|\s(?:ou|\/|;)\s/u, '|')
};

const PROTOCOLE_DOUBLE: RegleDeNettoyage = {
  nom: 'protocole doublé',
  selecteur: /^https?:\/\/https?:\/\/.*/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^https?:\/\/https?:\/\//u, 'https://')
};

const CAPITALES: RegleDeNettoyage = {
  nom: 'capitales',
  selecteur: /[A-Z]/u,
  corriger: (aCorriger: string): string => aCorriger.toLowerCase()
};

const ADRESSES_NON_SEPAREES: RegleDeNettoyage = {
  nom: 'adresses collées sans séparateur',
  selecteur: /(https?:\/\/[^|]+(?!\|))(https?:\/\/)/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/(https?:\/\/[^|]+(?!\|))(https?:\/\/)/gu, '$1|$2')
};

const BARRE_OBLIQUE_MANQUANTE: RegleDeNettoyage = {
  nom: 'une seule barre oblique',
  selecteur: /^https?:\/[a-zA-Z0-9]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/:\/([a-zA-Z0-9])/u, '://$1')
};

const DEUX_POINTS_ET_BARRES_MANQUANTS: RegleDeNettoyage = {
  nom: 'deux points et barres manquants',
  selecteur: /^https?\/www/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^https?\/www/u, 'https://www')
};

const VIRGULE_AU_LIEU_DU_POINT: RegleDeNettoyage = {
  nom: 'virgule au lieu du point',
  selecteur: /^http:\/\/www,/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^http:\/\/www,/u, 'http://www.')
};

const BARRE_MANQUANTE_APRES_LE_PROTOCOLE: RegleDeNettoyage = {
  nom: 'barre manquante après le protocole',
  selecteur: /^http:\/[^/]/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/^http:\//u, 'http://')
};

const PARENTHESES: RegleDeNettoyage = {
  nom: 'parenthèses à encoder',
  selecteur: /[()]/u,
  corriger: (aCorriger: string): string =>
    aCorriger.replace(/[()]/gu, (parenthese: string): string => (parenthese === '(' ? '%28' : '%29'))
};

const DEUX_POINTS_DEPLACES: RegleDeNettoyage = {
  nom: 'deux points déplacés',
  selecteur: /https\/\/:/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/https\/\/:/u, 'https://')
};

const DEUX_POINTS_MANQUANTS: RegleDeNettoyage = {
  nom: 'deux points manquants',
  selecteur: /(https?)(\/\/)/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/(https?)(\/\/)/u, '$1:$2')
};

const PROTOCOLE_MANQUANT: RegleDeNettoyage = {
  nom: 'protocole manquant',
  selecteur: /^(?!http).*/u,
  corriger: (aCorriger: string): string => `http://${aCorriger}`
};

const PROTOCOLE_MANQUANT_DANS_UNE_LISTE: RegleDeNettoyage = {
  nom: 'protocole manquant dans une liste',
  selecteur: /\|((?!http[s]?:\/\/)[^|]+)/u,
  corriger: (aCorriger: string): string => aCorriger.replace(/\|((?!http[s]?:\/\/)[^|]+)/gu, '|http://$1')
};

/**
 * L'ordre vient de mednum-cli, et il compte : les protocoles se réparent avant d'être ajoutés,
 * sans quoi `PROTOCOLE_MANQUANT` préfixerait une adresse dont le protocole est seulement mal
 * écrit.
 */
export const REGLES_SITE_WEB: readonly RegleDeNettoyage[] = [
  RETOUR_A_LA_LIGNE,
  DEUX_POINTS_APRES_WWW,
  SEPARATEUR_INATTENDU,
  PROTOCOLE_DOUBLE,
  CAPITALES,
  ADRESSES_NON_SEPAREES,
  BARRE_OBLIQUE_MANQUANTE,
  DEUX_POINTS_ET_BARRES_MANQUANTS,
  VIRGULE_AU_LIEU_DU_POINT,
  BARRE_MANQUANTE_APRES_LE_PROTOCOLE,
  PARENTHESES,
  DEUX_POINTS_DEPLACES,
  DEUX_POINTS_MANQUANTS,
  PROTOCOLE_MANQUANT,
  PROTOCOLE_MANQUANT_DANS_UNE_LISTE
];

/** L'adresse de site web réparée. Ne valide rien : c'est l'affaire de la validation. */
export const nettoyerSiteWeb = (siteWeb: string): string => appliquerRegles(REGLES_SITE_WEB, siteWeb);
