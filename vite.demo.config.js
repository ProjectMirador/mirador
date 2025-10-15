// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({
  base: process.env.BASE_PATH || `/${process.env.npm_package_name}/`,
  root: fileURLToPath(new URL('./__tests__/integration/mirador/', import.meta.url)),
  build: {
    emptyOutDir: true,
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    sourcemap: true,
  },
  plugins: [react()],
});
