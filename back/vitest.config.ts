import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    alias: {
      '@src': './src',
      '@test': './test',
    },
    root: './',
    coverage: {
      exclude: ['./src/lib/prisma.service.ts', '**.repository.ts', '**.controller.ts'],
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test',
    },
  },
  plugins: [swc.vite(), tsconfigPaths()],
});
