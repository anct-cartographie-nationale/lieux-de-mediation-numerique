import { defineConfig } from 'tsdown';

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
