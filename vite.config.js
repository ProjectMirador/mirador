import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

/**
* Vite configuration
*/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      fileName: (format) => (format === 'umd' ? 'mirador.js' : 'mirador.es.js'),
      formats: ['es', 'umd'],
      name: 'Mirador',
    },
    rollupOptions: {
      external: ['__tests__/*', '__mocks__/*'],
      output: {
        assetFileNames: 'mirador.[ext]',
      },
    },
    sourcemap: true,
  },
  esbuild: {
    exclude: [],
    // Matches .js and .jsx in __tests__ and .jsx in src
    include: [/__tests__\/.*\.(js|jsx)$/, /src\/.*\.jsx?$/],
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          // TODO: rename all our files to .jsx ...
          /** */
          setup(build) {
            build.onLoad({ filter: /(src|__tests__)\/.*\.js$/ }, async (args) => ({
              contents: await fs.readFile(args.path, 'utf8'),
              loader: 'jsx',
            }));
          },
        },
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@tests/': fileURLToPath(new URL('./__tests__', import.meta.url)),
    },
  },
  server: {
    open: '/__tests__/integration/mirador/index.html',
    port: '4444',
  },
});
