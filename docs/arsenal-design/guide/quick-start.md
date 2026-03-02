---
lang: en-US
---

# 快速开始

你可以选择在 vue 根目录下直接引入

```ts
import { createApp } from 'vue'
import { install } from 'arsenal-design'
import App from './app.vue'

// 直接全局引入
import 'arsenal-design/css/index.css'

createApp(App).use(install)
```

`arsenal-design` 本身已具备基于`es module`的 `tree-shaking` 的能力，你可以在需要使用组件的地方直接引入，这样只有用到的组件才会被打包。

```vue
<script setup lang="ts">
import 'arsenal-design/es/css/button'

import { Button } from 'pandan-ui'
</script>

<template>
  <Button>Get Stared</Button>
</template>
```

由于样式的压缩率很高，如果你很在意 JS 的打包体积又出于便捷性考虑，可以在全局引入样式文件并选择在文件中单独引入组件

```ts
import 'arsenal-design/css/index.css'
```

## 自动引入

出于 `vite` 生态的强大，您可以借助下面的`vite`插件来实现组件的自动引入

```shell
pnpm i -D unplugin-vue-components unplugin-auto-import arsenal-design

```

然后配置你的`vite.config.ts`

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { pandaUIResolver } from 'arsenal-design'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        pandaUIResolver()
      ]
    }),
    AutoImport({
      resolvers: [
        pandaUIResolver()
      ]
    })
  ]
})
```

## 全局类型支持

如果全局引入了组件库，在项目的`tsconfig.json` 文件配置 `compilerOptions.types` 选项可以快速获得全局类型支持：

```json
{
  "compilerOptions": {
    "types": ["arsenal-design/types"]
  }
}
```
