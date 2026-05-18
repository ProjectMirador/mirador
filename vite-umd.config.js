import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    rolldownOptions: {
      external: [
        '__tests__/*',
        '__mocks__/*',
      ],
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
