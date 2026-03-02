# Arsenal Design 样式设计参考

基于 `styles/design/variables.scss` 的设计变量与约定。在编写或修改 `styles/` 下组件样式、主题或设计 token 时使用本参考。

---

## 何时使用

- 在 `styles/` 下新增或修改组件 SCSS（如 `button.scss`）
- 需要引用设计变量、语义色、尺寸或圆角时
- 需要扩展或覆盖 `$color-map`、`$input-height-map` 等设计 token 时
- 可以参考[arco-design](https://arco.design/vue/component/link)的组件设计风格，但是色值和变量需要严格使用内部的

---

## 设计变量（variables.scss）

### 命名空间与类型

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `$namespace` | 组件类名前缀，用于 BEM | `'al'` |
| `$types` | 语义类型列表，用于生成 type 相关 CSS 变量 | `primary, error` |

### 基础颜色

| 变量 | 说明 |
|------|------|
| `$color-black` | 黑色 `#000` |
| `$color-white` | 白色 `#fff` |

### 颜色映射

**`$bg-color-map`**（背景）

- `base`: 默认背景（如 `rgb(255,255,255)`）
- `reverse`: 反色背景（如 `#131719`）
- `black`: 深色背景

**`$color-map`**（语义色，按类型 + 层级）

- 每类含：`7`（最深）、`base`（主色）、`5`、`3`（较浅）
- 当前类型：`primary`、`error`
- 示例：`map.get($color-map, primary, base)` → `#0A4BC7`

**`$fill-color-map`**

- `base`: 填充色（如 `#fff`），用于按钮等前景

### 尺寸与圆角

| 变量 | 键 | 说明 |
|------|-----|------|
| `$input-height-map` | `middle`, `small`, `large`, `mini` | 控件高度（如 middle: 32px） |
| `$radius-map` | `base` | 圆角（如 2px） |
| `$font-size-map` | `base`, `small`, `large` | 字号（如 base: 14px） |

---

## CSS 变量命名与用法（shared/mixins）

- 前缀：`--al-`（由 `to-css-var-name` 生成）
- 多段名：`to-css-var-name('color', 'primary', 'base')` → `--al-color-primary-base`

**常用 API：**

| 方法 | 用途 | 示例 |
|------|------|------|
| `get-css-var($name-units...)` | 读取 CSS 变量 | `get-css-var(color-primary-base)` → `var(--al-color-primary-base)` |
| `define-css-var($name-units, $value)` | 定义单条 CSS 变量 | 在 `:root` 或组件 vars 块中使用 |
| `define-preset-values($base-name, $style-map)` | 批量定义变量，键变为 `--al-{base-name}-{key}` | 用于组件 token（如 button 的 height、padding） |
| `define-preset-style($base-name, $style-map)` | 批量定义变量，值为其他 CSS 变量引用 | 用于组件样式映射到设计 token |

---

## 设计层 mixin（variables.scss）

| Mixin | 用途 |
|-------|------|
| `define-level-colors($type, $max-level, $mode, $mixed-color)` | 按层级生成该 type 的衍生色并写入 `$color-map` |
| `define-opacity-colors($type, $max-level)` | 按透明度生成该 type 的 opacity 色并写入 `$color-map` |
| `define-type-color($type)` | 将 `$color-map` 中该 type 的所有色写入 CSS 变量（如 `--al-color-primary-base`） |

---

## 组件样式中的使用约定

1. **引用设计变量**：用 `get-css-var(...)`，不要写死色值或尺寸（除极少数覆盖场景）。
2. **扩展设计 token**：在组件 SCSS 顶部用 `$xxx: map.merge(...)` 扩展对应 map，再通过 `define-preset-values` 暴露为 CSS 变量。
3. **语义色**：优先用 `get-css-var(color-{type}-{level})`（如 `color-primary-base`、`color-primary-5`、`color-primary-3`）。
4. **高度/圆角**：控件高度用 `$input-height-map` 或已暴露的变量（如 `get-css-var('button-height')`）；圆角用 `get-css-var('radius-base')`。
5. **namespace**：组件根类名使用 `.#{$namespace}-{component}`，与 `useNamespace` 的 kebab-case 一致。

---

## 反模式（避免）

- 不要在组件样式中写死 `#0A4BC7`、`32px` 等，应使用设计变量或 map。
- 不要新增与 `$color-map` 结构不一致的语义色；新类型应在 design variables 中扩展。
- 不要跳过 `$xxx: () !default` 与 `map.merge` 直接覆盖整个 map，以免破坏主题覆盖能力。
