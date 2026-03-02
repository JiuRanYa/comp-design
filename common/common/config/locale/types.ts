import type { DeepPartial } from '../types'

export interface LocaleConfig {
  locale: string

  input: {
    placeholder: string
  }

  inputEmoji: {
    copy: string
  }

  timePicker: {
    startPlaceholder: string
    endPlaceholder: string
    cancel: string
    confirm: string
    hour: string
    minute: string
    second: string
  }

  datePicker: {
    startPlaceholder: string
    endPlaceholder: string
    cancel: string
    confirm: string
    manual: string
    year: string
    month: string
    day: string
    hour: string
    minute: string
    second: string
    since: (placeholder: string) => string
    last: (digit: number, unit: string) => string
    sinceType: string
    fixedType: string
    lastType: string
    units: {
      days: string
      months: string
      years: string
      day: string
      month: string
      year: string
    }
  }
}

export type LocaleOptions = DeepPartial<LocaleConfig>
export type LocaleNames = Exclude<keyof LocaleConfig, 'locale' | 'wordSpace'>

export type ClassType = string | Record<string, any> | Array<string | Record<string, any>>
