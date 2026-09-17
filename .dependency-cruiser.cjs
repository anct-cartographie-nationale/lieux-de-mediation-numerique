/** @type {import('dependency-cruiser').IConfiguration} */

const SPEC_FILES = '[.](?:spec|test)[.](?:js|mjs|cjs|ts|mts|cts)$';

const HYGIENE = [
  {
    name: 'no-circular',
    severity: 'error',
    comment: 'Une dépendance circulaire : un des deux modules porte une responsabilité qui revient à l’autre.',
    from: {},
    to: { circular: true }
  },
  {
    name: 'not-to-unresolvable',
    severity: 'error',
    comment: 'Ce module dépend de quelque chose qui ne se résout à aucun fichier.',
    from: {},
    to: { couldNotResolve: true }
  },
  {
    name: 'no-non-package-json',
    severity: 'error',
    comment: "Ce module dépend d'un paquet npm absent des dépendances déclarées.",
    from: {},
    to: { dependencyTypes: ['npm-no-pkg', 'npm-unknown'] }
  },
  {
    name: 'not-to-dev-dep',
    severity: 'error',
    comment:
      "Ce module de production dépend d'une dépendance de développement : elle ne sera pas installée " +
      'chez le consommateur du paquet.',
    from: { path: '^src', pathNot: SPEC_FILES },
    to: { dependencyTypes: ['npm-dev'], dependencyTypesNot: ['type-only'] }
  },
  {
    name: 'not-to-spec',
    severity: 'error',
    comment: "Ce module dépend d'un fichier de test : le test doit dépendre du code, jamais l'inverse.",
    from: {},
    to: { path: SPEC_FILES }
  }
];

/**
 * Le cloisonnement de la bibliothèque, vérifié mécaniquement plutôt que promis en commentaire.
 *
 * `models` est le socle : il ne dépend d'aucun autre module. Les quatre autres s'appuient sur
 * lui, et `nettoyage` ne s'appuie **que** sur lui.
 */
const COUCHES = [
  {
    name: 'models-ne-depend-de-personne',
    severity: 'error',
    comment:
      'Le socle ne dépend de rien : un modèle qui aurait besoin du nettoyage, de la validation ou ' +
      "d'un transfert n'est plus un socle.",
    from: { path: '^src/models', pathNot: SPEC_FILES },
    to: { path: '^src/(nettoyage|validation|deduplication|transfer)' }
  },
  {
    name: 'nettoyage-ne-valide-pas',
    severity: 'error',
    comment:
      'D1 : réparer une donnée doit pouvoir se faire sans la valider — mednum-cli normalise une ' +
      'adresse pour interroger la BAN sans rien exiger d’elle. Le nettoyage reste des fonctions ' +
      'pures, et n’emprunte au socle que ses vocabulaires et ses prédicats géométriques.',
    from: { path: '^src/nettoyage', pathNot: SPEC_FILES },
    to: { path: '^src/(validation|deduplication|transfer)' }
  },
  {
    name: 'validation-et-deduplication-ignorent-les-transferts',
    severity: 'error',
    comment:
      'Un schéma d’assemblage et une règle de rapprochement portent sur le modèle, pas sur un ' +
      'format d’échange. La dépendance va dans l’autre sens.',
    from: { path: '^src/(validation|deduplication)', pathNot: SPEC_FILES },
    to: { path: '^src/transfer' }
  }
];

module.exports = {
  forbidden: [...HYGIENE, ...COUCHES],
  options: {
    doNotFollow: { path: ['node_modules'] },
    /**
     * swc et non le compilateur TypeScript : dependency-cruiser 18 n'accepte pas encore
     * TypeScript 7, et sans analyseur il ne lit **aucun** module — il rend « 0 modules cruised »
     * et passe au vert. Une règle qui ne voit rien est toujours d'accord.
     */
    parser: 'swc',
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      mainFields: ['module', 'main', 'types', 'typings']
    },
    skipAnalysisNotInRules: true,
    reporterOptions: {
      dot: { collapsePattern: 'node_modules/(?:@[^/]+/[^/]+|[^/]+)' },
      text: { highlightFocused: true }
    }
  }
};
