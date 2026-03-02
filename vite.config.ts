import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import type { Manifest } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import DefineOptions from 'unplugin-vue-define-options/vite'
import dts from 'vite-plugin-dts'

const outDir = 'dist/arsenal-design/types'

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as Manifest

const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {}),
)
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`))

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const input = await glob('components/**/*.{ts,vue}', {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true,
  })

  return {
    publicDir: false,
    resolve: {
      alias: [
        { find: /^@\//, replacement: resolve(__dirname) },
        { find: /^@\/components/, replacement: resolve(__dirname, 'components') },
      ],
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'arsenal-design'),
        name: 'arsenal-design',
      },
      rollupOptions: {
        input,
        external,
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: resolve(__dirname, 'arsenal-design'),
            dir: resolve(__dirname, 'dist', 'lib'),
            exports: 'named',
            entryFileNames: '[name].cjs',
          },
          {
            format: 'es',
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: resolve(__dirname, 'arsenal-design'),
            dir: resolve(__dirname, 'dist', 'es'),
            entryFileNames: '[name].mjs',
          },
        ],
        // external: await generateExternal({ full: false }),
        treeshake: false,
      },
      commonjsOptions: {
        sourceMap: false,
      },
      chunkSizeWarningLimit: 10000,
    },
    plugins: [
      vue(),
      vueJSX(),
      DefineOptions(),

      dts({
        include: ['packages', 'index.ts', 'types.d.ts'],
        exclude: ['node_modules', 'components/*/tests'],
        outDir,
        compilerOptions: {
          sourceMap: false,
          paths: {
            'arsenal-design': ['.'],
            'vue-router': ['node_modules/vue-router'],
          },
          skipDiagnostics: false,
        },
        copyDtsFiles: true,
        pathsToAliases: false,
      }),
    ],
  }
})
