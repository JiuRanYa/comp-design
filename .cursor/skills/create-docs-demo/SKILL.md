---
name: create-docs-demo
description: Use only when the user explicitly asks to create or add documentation or demos (e.g. 写文档、补充文档、加示例、为某组件写文档、加 demo). Do not use when the user only asks to create or modify a component—then use create-component only.
---

# Arsenal Design 文档示例规范

## 何时使用（仅在此类请求时命中本 skill）

- 用户**明确要求**「写文档」「补充文档」「为某组件写文档」「加示例 / demo」「补充示例」时
- 为已有组件新增或调整「按 props 划分」的示例时（用户明确提到文档或示例）
- 需要统一文档路径、demo 路径与 `:::demo` 写法时

## 何时不使用（不命中本 skill）

- 用户仅说「创建一个 XXX 组件」「新增一个 Button」等，未提及文档或示例：只做组件开发，使用 [create-component](../create-component/SKILL.md)，不要顺带创建文档与 demo。
- 用户仅修改组件代码、样式或 props，未要求更新文档时：不要自动去改文档或 demo。

---

## 路径约定

| 类型 | 路径 | 说明 |
|------|------|------|
| 组件文档 | `docs/arsenal-design/components/{component-name}.md` | `component-name` 为 kebab-case，与路由 `/components/{component-name}` 对应 |
| 示例入口 | `docs/demos/{component-name}/{example-name}/index.vue` | 每个示例一个目录，入口固定为 `index.vue` |

文档中引用示例的路径为：`{component-name}/{example-name}`（如 `button/basic`、`link/type`）。构建时会通过 `import.meta.glob('../../demos/{component}/**/*.vue')` 注入，仅对 `docs/.../components/*.md` 生效。

---

## 按 Props 规划示例目录

根据组件的 `props.ts` 决定要建哪些示例目录，建议：

1. **basic**（必选）：最简用法，展示默认或主要用法。
2. **按 prop 分目录**：每个目录对应一个主题，目录名与「用法主题」对应即可，不必与 prop 名完全一致：
   - `type`：展示 `type` 各取值（如 primary、default）
   - `size`：展示 `size` 各取值（如 large、middle、small）
   - `disabled`：展示 `disabled` 状态
   - `underline`：仅对有该 prop 的组件（如 Link）

示例目录名使用小写、短横线（如 `basic`、`disabled`、`underline`）。

---

## 示例文件模板（index.vue）

每个示例一个 Vue 单文件，仅需写 `<template>`，直接使用已在文档站注册的组件名（如 `Button`、`Link`）：

**基本用法示例（basic）：**

```vue
<template>
  <ComponentName>默认</ComponentName>
  <ComponentName type="primary">
    Primary
  </ComponentName>
</template>
```

**单 prop 用法示例（如 disabled）：**

```vue
<template>
  <ComponentName disabled>
    禁用
  </ComponentName>
</template>
```

**多 prop 组合示例（如 size）：**

```vue
<template>
  <ComponentName size="large">
    Large
  </ComponentName>
  <ComponentName>Default</ComponentName>
  <ComponentName size="small">
    Small
  </ComponentName>
</template>
```

- 组件名使用 PascalCase，与 `components/index.ts` 中注册的名称一致。
- 不需要在示例中 import 组件，文档站已全局注册。
- 可按需包一层 `<div>` 做布局（如间距），参考现有 `docs/demos/button/*`。

---

## 文档页 Markdown 模板

在 `docs/arsenal-design/components/{component-name}.md` 中写文档，并引用上述示例路径：

```markdown
---
title: ComponentName
lang: zh-CN
description: 一句话描述组件
---

# ComponentName

一句话描述组件

## 基本用法

:::demo 使用 `type` 定义组件样式

{component-name}/basic

:::

### 禁用状态

:::demo

{component-name}/disabled

:::

### 不同尺寸

:::demo

{component-name}/size

:::

### {component-name}参数

| 名称    | 说明           | 类型                                                        | 默认值    | 始于 |
| ------- | -------------- | ----------------------------------------------------------- | --------- | ---- |

## {component-name}Group 参数

| 名称   | 类型             | 说明      | 默认值  | 始于 |
| ------ | ---------------- | --------- | ------- | ---- |

## {component-name} 插槽

| 名称 | 说明       |
| ---- | ---------- |

```

- `:::demo` 后同一行可写说明文字（会渲染在示例上方）；下一行必须是 `{component-name}/{example-name}`，且对应 `docs/demos/{component-name}/{example-name}/index.vue`。
- 文档文件名须为 `{component-name}.md`，这样 markdown 插件会为该组件注入 `demos` glob。

---

## 侧栏配置

在 `docs/.vitepress/configs/sidebar.ts` 的 `components` 下相应分组中增加链接，例如：

```ts
{ text: 'Link 链接', link: '/components/link' },
```

多项目时链接可能带项目前缀（如 `/arsenal-design/components/link`），以项目内 nav/sidebar 配置为准。

---

## 与 create-component 的衔接

- 组件实现规范见 [create-component](../create-component/SKILL.md)。
- **本 skill 仅在用户明确要求文档/示例时使用**。按本 skill 在 `docs/arsenal-design/components/` 写组件文档、在 `docs/demos/{component-name}/` 下按 props 建示例目录与 `index.vue`，并在 sidebar 中登记。
