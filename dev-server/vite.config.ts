import { resolve } from 'node:path'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Comp from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'

const demos = process.env.DEMOS
const port = Number.parseInt(process.env.PORT || '') || 8008

const componentsDir = resolve(__dirname, '../components')
const components = readdirSync(componentsDir).filter((f) => {
  const path = resolve(componentsDir, f)

  if (!statSync(path).isDirectory())
    return false

  return existsSync(`${path}/index.ts`)
})

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export default defineConfig(async (): Promise<UserConfig> => {
  return {
    publicDir: '../docs/public',
    resolve: {
      alias: [
        { find: /^@\//, replacement: `${resolve(__dirname, '../')}/` },
      ],
    },
    optimizeDeps: {
      include: [
        '@arsenal-design/icons',
        ...Object.keys(pkg.dependencies).filter((dep: string) => !dep.includes('arsenal-design')),
      ],
    },
    build: {
      commonjsOptions: {
        esmExternals: true,
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      Comp({
        dts: false,
        resolvers: [
          {
            type: 'component',
            resolve: (name) => {
              const kebabName = toKebabCase(name)

              if (components.includes(kebabName)) {
                return {
                  name,
                  from: `@/components/${kebabName}/index.ts`,
                }
              }
            },
          },
        ],
      }),
    ],
    define: {
      __DEMOS__: demos,
      __PORT__: JSON.stringify(port),
    },
    server: {
      port,
      fs: {
        allow: ['..'],
      },
    },
  }
})

function toKebabCase(value: string) {
  return (
    value.charAt(0).toLowerCase()
    + value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}
