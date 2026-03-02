import type { PropType } from 'vue'
import type { ComponentSize } from '@arsenal-design/common'
import { booleanProps, buildProps } from '@arsenal-design/common'

export type ButtonType =
  | 'primary'
  | 'success'
  | 'default'
  | 'error'
  | 'warning'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'

export const buttonProps = buildProps({
  disabled: booleanProps,
  type: String as PropType<ButtonType>,
  size: String as PropType<ComponentSize>,
  icon: Object,
})

export const buttonGroupProps = buildProps({
  circle: booleanProps,
})
