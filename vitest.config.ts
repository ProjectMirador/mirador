/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
export default defineConfig({
  oxc: {
    exclude: [],
    include: /(src|__tests__)\/.*\.jsx?$/,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@tests': fileURLToPath(new URL('./__tests__', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    exclude: ['node_modules'],
    globals: true,
    include: ['**/*.test.js', '**/*.test.jsx'],
    sequence: {
      shuffle: true,
    },
    setupFiles: ['./setupTest.js'],
  },
});
