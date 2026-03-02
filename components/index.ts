import { Button } from './button'
import { CollapseTransition } from './collapse-transition'

import { buildInstall } from './create'

export * from './create'

const components = [Button, CollapseTransition]

export const install = buildInstall(components)

export * from './button'
export * from './collapse-transition'
