import type { App, ComputedRef, MaybeRef } from 'vue'
import { computed, inject, unref } from 'vue'
import type { LocaleNames, LocaleOptions } from './types'

export function useLocale(): ComputedRef<LocaleOptions>
export function useLocale<T extends LocaleNames>(name?: T, customLocale?: MaybeRef<Partial<LocaleOptions[T]>>): ComputedRef<T extends LocaleNames ? LocaleOptions[T] : LocaleOptions>

export function useLocale<T extends LocaleNames>(name?: T, customLocale?: MaybeRef<Partial<LocaleOptions[T]>>) {
  const locale = inject<ComputedRef<LocaleOptions>>(localeContext, globalLocale)

  if (!name)
    return locale

  if (customLocale)
    return computed(() => ({ ...(locale.value?.[name] ?? {}), ...(unref(customLocale) ?? {}) }))

  return computed(() => locale.value?.[name] ?? {})
}

export const localeContext = Symbol('_arsenal-design-provoded-locale')

export function configLocale(locale: MaybeRef<LocaleOptions>, app: App) {
  // client-server
  if (app)
    app.provide(localeContext, locale)
}

export * from './types'
