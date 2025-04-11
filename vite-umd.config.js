import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';

/**
 * Vite configuration
 */
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: './src/index.js',
      fileName: (format) => (format === 'umd' ? 'mirador.min.js' : undefined),
      formats: ['umd'],
      name: 'Mirador',
    },
    rollupOptions: {
      external: ['__tests__/*', '__mocks__/*'],
      output: {
        assetFileNames: 'mirador.[ext]',
        exports: 'named',
      },
    },
    sourcemap: true,
  },
  define: {
    'process.env': {},
  },
  plugins: [react()],
});
