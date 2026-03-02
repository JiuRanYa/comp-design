---
name: create-component
description: Guide for writing Vue 3 components in Arsenal Design. Use when creating or modifying components in arsenal-design, or when asked about component structure, BEM naming, props, or useNamespace/useProps patterns. Do not use for documentation or demos—use create-docs-demo only when the user explicitly asks for docs/demos.
---

# Arsenal Design 组件规范

## 何时使用

- 在 `components/` 下新建或修改组件
- 需要遵循项目 BEM 命名、props、useProps/useNamespace 等约定时
- 在需要设计或者修改组件样式的时候，需要根据 `style-design.md` 中的约定进行修改

## 何时不使用（不命中本 skill）

- 用户仅要求「写文档」「补充文档」「加示例 / demo」「为某组件写文档」时：应使用 [create-docs-demo](../create-docs-demo/SKILL.md)，不要在本 skill 下顺带创建文档与示例。
- 创建组件时不要自动创建文档与 demo；仅当用户明确要求创建文档或示例时，才去命中 create-docs-demo。

---

## 组件目录结构

```
components/{component-name}/
├── {component-name}.vue   # 主组件
├── props.ts               # Props 定义
└── index.ts               # 导出入口
```

---

## Vue 组件模板（以 button.vue 为参考）

### Script Setup 结构

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace, useProps } from '@arsenal-design/common'
import { buttonProps } from './props'

defineOptions({
  name: 'Button',
})

const _props = defineProps(buttonProps)

const ns = useNamespace('button')

const props = useProps('button', _props, {
  type: 'primary',
  size: 'middle',
  icon: null,
  disabled: false,
})

const btnRef = ref()
const classNames = computed(() => ({
  [ns.b()]: true,
  [ns.bs('vars')]: true,
  [ns.bm(props.type)]: props.type !== 'default',
  [ns.bm(props.size)]: props.size !== 'middle',
  [ns.bm('disabled')]: props.disabled,
}))

defineExpose({
  el: btnRef,
})
</script>

<template>
  <button ref="btnRef" type="button" :class="classNames" :disabled="props.disabled">
    <div v-if="props.icon || $slots.icon" :class="ns.be('icon')">
      <Icon v-if="props.icon" :icon="props.icon" />
      <slot v-else name="icon" />
    </div>
    <slot />
  </button>
</template>
```

### 关键约定

| 项目 | 约定 |
|------|------|
| **defineOptions** | 必须设置 `name`，使用 PascalCase（如 `Button`） |
| **Props** | `const _props = defineProps(xxxProps)`，再用 `useProps('component-name', _props, defaults)` 得到带默认值的 `props` |
| **useNamespace** | 从 `@arsenal-design/common` 导入，参数为 kebab-case 组件名（如 `'button'`） |
| **useProps** | 从 `@arsenal-design/common` 导入，第一个参数为 kebab-case 组件名 |
| **模板中 props** | 统一使用 `props.xxx`，不用裸 `xxx` |
| **根元素 ref** | 命名为 `xxxRef`（如 `btnRef`），并在 `defineExpose` 中暴露为 `el` |
| **弹出层 usePopper** | 从`@arsenal-design/hooks` 导入，使用 `usePopper` 钩子管理弹出层状态 |

---

## BEM 命名（useNamespace）

从 `@arsenal-design/common` 导入 `useNamespace`，传入 kebab-case 组件名：

```ts
const ns = useNamespace('button')
```

| 方法 | 用途 | 示例 |
|------|------|------|
| `ns.b()` | Block | `bl-button` |
| `ns.be('icon')` | Element | `bl-button__icon` |
| `ns.bm('primary')` | Modifier | `bl-button--primary` |
| `ns.bs('vars')` | Block suffix（如 vars） | `bl-button-vars` |
| `ns.bem('icon', 'left')` | Element + Modifier | `bl-button__icon--left` |

classNames 中通常包含：
- `[ns.b()]: true`：始终应用 block
- `[ns.bs('vars')]: true`：用于 CSS 变量
- `[ns.bm(modifier)]: condition`：按条件应用 modifier

---

## Props 定义（props.ts）

```ts
import type { PropType } from 'vue'
import type { ComponentSize } from '@arsenal-design/common'
import { booleanProps, buildProps } from '@arsenal-design/common'

export type ButtonType = 'primary' | 'success' | 'default' | 'error' | 'warning' | 'outline' | 'secondary' | 'ghost'

export const buttonProps = buildProps({
  disabled: booleanProps,
  type: String as PropType<ButtonType>,
  size: String as PropType<ComponentSize>,
  icon: Object,
})
```

约定：
- 使用 `buildProps` 定义 props，会自动合并 `inherit` 等通用属性
- 使用 `booleanProps`、`PropType` 等类型工具
- 导出类型（如 `ButtonType`）和 props 对象（如 `buttonProps`）

---

## Index 导出

```ts
import Button from './button.vue'

export { Button }
```

---

## 样式（SCSS）

样式在 `styles/` 下，按组件拆分（如 `styles/button.scss`）。类名遵循 BEM，与 `useNamespace` 对应。

设计变量、颜色/尺寸 token、CSS 变量命名及 mixin 用法见 [style-design.md](style-design.md)。

- Block: `.#{$namespace}-button`
- Element: `&__icon`
- Modifier: `&--primary`, `&--disabled`
- Vars: `&-vars` 用于 CSS 变量

---

## 依赖来源

- `useNamespace`、`useProps`、`buildProps`、`booleanProps`、类型：`@arsenal-design/common`
- Vue API：`vue`

---

## 反模式（避免）

- 不要从 `@arsenal-design/hooks` 单独导入 `useNamespace`，组件统一用 `@arsenal-design/common`
- 不要在模板中直接使用 `icon` 等 prop 名，应使用 `props.icon`
- 不要跳过 `useProps`，否则无法使用全局配置的默认值
- 不要使用非 BEM 的 class 命名
- **不要在本 skill 下创建或修改文档与 demo**：文档与示例由 [create-docs-demo](../create-docs-demo/SKILL.md) 负责，仅当用户明确要求「写文档」「加示例」等时再使用该 skill。
