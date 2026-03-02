---
lang: en-US
---

# Nuxt 模块

## 使用方式

如果您想要在Nuxt项目中使用`Arsenal Design`，可以使用`@arsenal-design/nuxt`模块快速集成到你的项目里

```shell
# Using pnpm
pnpm i -D @arsenal-design/nuxt

# Using yarn
yarn add -D @arsenal-design/nuxt
```

在您的`nuxt.config.js`中添加`@arsenal-design/nuxt`

```typescript
export default defineNuxtConfig({
  modules: [
    '@arsenal-design/nuxt'
  ],
  SimpleUI: {
    // Your module options
  }
})
```

接下来，您可以直接使用Arsenal Design中的组件

```vue
<template>
  <PButton @click="handleClick">
    Button
  </PButton>
</template>
```
## ModuleOptions

```typescript
export interface ModuleOptions {
  /**
   * Include files that need to automatically resolve
   *
   * @default
   * [
   *   /\.vue$/,
   *   /\.vue\?vue/,
   *   /\.vue\?v=/,
   *   /\.((c|m)?j|t)sx?$/
   * ]
   */
  include: []
  /**
   * Include files that don't need to automatically resolve
   *
   * @default
   * [
   *   /[\\/]node_modules[\\/]/,
   *   /[\\/]\.git[\\/]/,
   *   /[\\/]\.nuxt[\\/]/
   * ]
   */
  exclude: []
  /**
   * Import css or sass styles with components
   *
   * @default 'css'
   */
  importStyle: boolean | 'css' | 'sass'
  /**
   * Import the dark theme preset styles
   *
   * @default false
   */
  importDarkTheme: boolean

  themeVarsPath: {
    base?: string
    dark?: string
  }
  /**
   * Whether import all styles at once
   *
   * It will be true if don't specify and run in dev mode
   *
   * @default undefined
   */
  fullStyle?: boolean
  /**
   * Prefix for name of components
   *
   * @default 'P'
   */
  prefix: string
  /**
   * Resolve icon components from '@arsenal-design/icons'
   *
   * @default true
   */
  resolveIcon: boolean
}
```
