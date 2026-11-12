// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { playwright } from '@vitest/browser-playwright';


export default defineConfig({
  // Shared Vite plugins and aliases (inherited via `extends: true`)
  oxc: {
    exclude: [],
    include: /(src|__tests__)\/.*\.jsx?$/,
  },
  optimizeDeps: {
    include: [
      '@testing-library/react',
      '@testing-library/user-event',
      '@testing-library/jest-dom/vitest',
    ],
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@tests': fileURLToPath(new URL('./__tests__', import.meta.url)),
    },
  },
  test: {
    globals: true,
    sequence: {
      shuffle: true,
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit', // Runs in Node + happy-dom
          environment: 'happy-dom',
          environmentOptions: {
            happyDOM: {
              settings: {
                navigation: { disableChildFrameNavigation: true },
              },
            },
          },
          // Matches all normal tests, EXCLUDING browser tests
          include: ['**/*.test.js', '**/*.test.jsx'],
          exclude: ['**/*.browser.test.js', '**/*.browser.test.jsx', 'node_modules'],
          setupFiles: ['./setupTest.js'],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser', // Runs in real Chromium
          browser: {
            enabled: true,
            provider: playwright({
              contextOptions: {
                permissions: ['clipboard-read', 'clipboard-write'],
              },
            }),
            headless: true,
            instances: [{ browser: 'chromium', }],
          },
          // Matches ONLY *.browser.test.* files
          include: ['**/*.browser.test.js', '**/*.browser.test.jsx'],
          setupFiles: ['./setupBrowserTest.js'],
        },
      },
    ],
  },
});
