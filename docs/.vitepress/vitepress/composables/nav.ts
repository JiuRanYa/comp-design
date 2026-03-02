import { computed } from 'vue'
import { navs } from '../../configs/nav'

export function useNav() {
  return computed(() => {
    return navs
  })
}
