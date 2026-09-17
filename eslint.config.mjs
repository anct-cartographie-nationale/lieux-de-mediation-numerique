import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  {
    rules: {
      /**
       * Deux `import` depuis un même module sont un artefact de remplacement mécanique, pas un
       * choix : quatre fichiers en portaient, dont un avec vingt instructions vers `../../models`.
       */
      'no-duplicate-imports': ['error', { includeExports: true }]
    }
  }
];
