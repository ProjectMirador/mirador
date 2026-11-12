import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

export default defineConfig({
  oxc: {
    exclude: [],
    include: /(src|__tests__)\/.*\.jsx?$/,
  },
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      // https://vitest.dev/config/browser/playwright
      instances: [
        { browser: 'chromium' }
      ],
    },
    include: ['vitest-example/*.test.jsx']
  },
  resolve: {
    alias: {
      '@tests': fileURLToPath(new URL('./__tests__', import.meta.url)),
    },
  },
})
