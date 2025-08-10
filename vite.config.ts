import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [
      preact(),
      ...(isLib ? [
        dts({
          insertTypesEntry: true,
          include: ['nebula/**/*'],
          exclude: ['nebula/**/*.test.*']
        })
      ] : [])
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./nebula', import.meta.url)),
        '@/components': fileURLToPath(new URL('./nebula/components', import.meta.url)),
        '@/types': fileURLToPath(new URL('./nebula/types', import.meta.url)),
        '@/utils': fileURLToPath(new URL('./nebula/utils', import.meta.url))
      }
    },
    css: {
      postcss: './postcss.config.cjs'
    },
    ...(isLib ? {
      build: {
        lib: {
          entry: resolve(fileURLToPath(new URL('./nebula/index.ts', import.meta.url))),
          name: 'NebulaUI',
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
        },
        rollupOptions: {
          external: ['preact', 'preact/hooks', 'preact/jsx-runtime', 'preact/compat'],
          output: {
            globals: {
              preact: 'preact',
              'preact/hooks': 'preactHooks',
              'preact/jsx-runtime': 'preactJsxRuntime',
              'preact/compat': 'preactCompat'
            },
            assetFileNames: 'styles.[ext]'
          }
        },
        sourcemap: true,
        emptyOutDir: true
      }
    } : {})
  }
})
