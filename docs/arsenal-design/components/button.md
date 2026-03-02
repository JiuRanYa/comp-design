---
title: Button
lang: zh-CN
description: 一个基础的按钮组件
---

# Button

一个基础的按钮组件

## 基本用法

:::demo 使用 `type` 定义组件样式

button/basic

:::

## 禁止状态

:::demo

button/disabled

:::

## 不同尺寸

:::demo

button/size

:::

## Button 参数

| 名称    | 说明           | 类型                                                        | 默认值    | 始于 |
| ------- | -------------- | ----------------------------------------------------------- | --------- | ---- |
| type    | 按钮的类型     | `default \| primary \| warn \| success \| warning \| error` | `default` | -    |
| disabled | 是否禁用按钮   | `Boolean`                                                   | `false`   | -    |
| icon    | 按钮的前置图标 | `svg`                                                       | `null`    | -    |

## ButtonGroup 参数

| 名称   | 类型             | 说明      | 默认值  | 始于 |
| ------ | ---------------- | --------- | ------- | ---- |
| circle | 按钮组是否为圆角 | `Boolean` | `false` | -    |

## Button 插槽

| 名称 | 说明       |
| ---- | ---------- |
| icon | 按钮的图标 |

