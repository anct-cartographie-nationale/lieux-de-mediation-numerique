import { defineConfig } from 'tsdown';

/**
 * La construction résout les imports relatifs, ce qui permet de les écrire **sans extension**
 * dans les sources — la convention du dépôt, et celle qu'attend un lecteur de TypeScript.
 *
 * C'est ce qui rend possible le champ `exports` : l'ESM émis porte des chemins complets, que
 * le résolveur de Node accepte, là où un `export * from './models'` le faisait échouer sur un
 * `ERR_UNSUPPORTED_DIR_IMPORT`.
 *
 * `unbundle` conserve un fichier émis par fichier source : la sortie garde la forme de
 * l'arborescence, au lieu de fondre en un seul module.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'lib',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  target: 'es2022',
  unbundle: true,
  dts: true,
  sourcemap: false,
  clean: true
});
