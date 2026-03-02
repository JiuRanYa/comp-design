import type { App } from 'vue'
import type { IconsOptions, MaybeRef } from '@arsenal-design/common'
import { configIcons, configProps, configZIndex, isNumber, toCapitalCase } from '@arsenal-design/common'
import type { LocaleOptions } from '@arsenal-design/common/config/locale/types'
import type { PropsOptions } from './props'

export interface InstallConfig {
  props?: PropsOptions
  prefix?: string
  zIndex?: number
  icons?: MaybeRef<IconsOptions>
  locale?: MaybeRef<LocaleOptions>
}

export function buildInstall(components: any[] = []) {
  return function install(app: App, options: InstallConfig = {}) {
    const { props = {}, prefix = '', zIndex = 2000, icons = {} } = options

    configProps(props, app)
    configIcons(icons as IconsOptions, app)

    if (isNumber(zIndex))
      configZIndex(zIndex, app)

    const normallizedPrefix = toCapitalCase(prefix || '')

    components.forEach((component) => {
      if (typeof component === 'function' || typeof component.install === 'function')
        app.use(component)
      else
        app.component(`${normallizedPrefix}${component.name}`, component)
    })
  }
}
