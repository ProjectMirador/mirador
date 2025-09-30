import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import * as packageJson from './package.json';

/**
* Vite configuration
*/
export default defineConfig({
  ...(
    process.env.NETLIFY ? {
      build: {
        rollupOptions: {
          external: ['__tests__/*', '__mocks__/*'],
          input: Object.fromEntries(
            globSync('./__tests__/integration/mirador/*.html').map((file) => [
              // This remove `src/` as well as the file extension from each
              // file, so e.g. src/nested/foo.js becomes nested/foo
              path.relative(
                '__tests__/integration/mirador',
                file.slice(0, file.length - path.extname(file).length),
              ),
              // This expands the relative paths to absolute paths, so e.g.
              // src/nested/foo becomes /project/src/nested/foo.js
              fileURLToPath(new URL(file, import.meta.url)),
            ]),
          ),
        },
        sourcemap: true,
      },
    } : {
      build: {
        lib: {
          entry: './src/index.js',
          fileName: (format) => (format === 'es' ? 'mirador.es.js' : undefined),
          formats: ['es'],
          name: 'Mirador',
        },
        rollupOptions: {
          external: (id, parentId) => {
            const peers = Object.keys(packageJson.peerDependencies);
            return peers.indexOf(id) > -1
              || peers.find((peer) => id.startsWith(`${peer}/`))
              || id.startsWith('__tests__/')
              || id.startsWith('__mocks__/');
          },
          output: {
            assetFileNames: 'mirador.[ext]',
            exports: 'named',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        sourcemap: true,
      },
    }
  ),
  define: {
    'process.env': {},
  },
  plugins: [
    react(),
    {
      /**
        * Middleware to rewrite HTML URLs to point to the deep path
       */
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          // Strip query parameters
          const originalUrl = req.url.split('?')[0];

          // Handle root URL directly
          if (originalUrl === '/') {
            req.url = '/__tests__/integration/mirador/index.html';
            console.log(`[rewrite] / → ${req.url}`);
            return next();
          }

          // Skip if path already rewritten or includes file extensions other than .html
          if (originalUrl.startsWith('/__tests__/integration/mirador/')) return next();
          if (path.extname(originalUrl) && path.extname(originalUrl) !== '.html') return next();

          // Add .html extension if needed
          const pathWithExtension = path.extname(originalUrl)
            ? originalUrl
            : `${originalUrl}.html`;

          const deepPath = path.join(
            '__tests__/integration/mirador',
            decodeURIComponent(pathWithExtension),
          );

          try {
            // Check if this is a file we own (not HMR-related vite files, for example)
            await fs.access(deepPath);
            req.url = `/__tests__/integration/mirador${pathWithExtension}`;
            console.log(`[rewrite] ${originalUrl} → ${req.url}`);
          } catch {
            // Not ours / does not exist — skip rewrite
          }

          return next();
        });
      },
      name: 'html-url-rewrite',
    },
  ],
  resolve: {
    alias: {
      '@tests/': fileURLToPath(new URL('./__tests__', import.meta.url)),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, 'src'),
        path.resolve(__dirname, '__tests__/integration/mirador')], // allow serving from here
    },
    middlewareMode: false,
    open: '/index.html',
    port: '4444',
  },
});
