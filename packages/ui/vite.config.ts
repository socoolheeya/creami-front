import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dtsModule = require('vite-plugin-dts')
import * as path from 'node:path'

const dts = (dtsModule as unknown as { default?: typeof dtsModule }).default ?? dtsModule

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['components/**/*.ts', 'components/**/*.tsx'],
      outDir: 'dist',
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'components/index.ts'),
      name: 'CreamiUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'lucide-react', 'next-themes', 'next-intl'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
          'react-dom': 'ReactDOM',
          'lucide-react': 'LucideReact',
          'next-themes': 'NextThemes',
          'next-intl': 'NextIntl',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
