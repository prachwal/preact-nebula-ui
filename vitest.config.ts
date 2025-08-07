/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'preact'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [fileURLToPath(new URL('./vitest.setup.ts', import.meta.url))],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: [
        'nebula/**/*.{ts,tsx}'
      ],
      exclude: [
        'node_modules/',
        'dist/',
        'src/',
        '**/*.test.{ts,tsx}',
        '**/*.a11y.test.{ts,tsx}',
        '**/*.config.{ts,js}',
        '**/*.d.ts',
        '**/types.ts',
        '**/index.ts',
        'vitest.setup.ts',
        'nebula/**/*.test.{ts,tsx}',
        'nebula/**/*.a11y.test.{ts,tsx}',
        'nebula/**/images/**'
      ],
      all: true,
      skipFull: false,
      clean: true,
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./nebula', import.meta.url)),
      '@/components': fileURLToPath(new URL('./nebula/components', import.meta.url)),
      '@/types': fileURLToPath(new URL('./nebula/types', import.meta.url)),
      '@/utils': fileURLToPath(new URL('./nebula/utils', import.meta.url)),
      // Aliasy React -> Preact dla kompatybilności z testing-library
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  define: {
    // Globalne zmienne dla środowiska testowego
    'process.env.NODE_ENV': '"test"',
    'process.env.VITEST': 'true'
  }
})
