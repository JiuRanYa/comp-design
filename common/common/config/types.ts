import type { PropType } from 'vue'
import type { LocaleConfig, LocaleNames } from './locale'

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T

export function localeProp<N extends LocaleNames>(_name: N) {
  return Object as PropType<Partial<LocaleConfig[N]>>
}
