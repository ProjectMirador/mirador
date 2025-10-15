// vite.config.js (or .ts)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({

  build: {
    emptyOutDir: true,
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    sourcemap: true,
  },
  plugins: [react()],
  root: fileURLToPath(new URL('./__tests__/integration/mirador/', import.meta.url)),

});
