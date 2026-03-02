import { useData } from 'vitepress'
import { computed } from 'vue'
import { siderbarsConfig } from '@/.vitepress/configs/sidebar'

export interface SidebarItem {
  text: string
  link: string
}

export type SidebarConfig = SidebarItem[]

export interface Sidebar {
  [key: string]: SidebarConfig
}
export function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`
}

function getSidebarConfig(path: string) {
  return siderbarsConfig[path]
}
export function useSidebar() {
  const { page } = useData()
  const path = computed(() => page.value.filePath.split('/')[1])

  const sidebars = computed(() => {
    if (page.value.frontmatter.hasSidebar === false)
      return []

    const sidebars = getSidebarConfig(path.value)

    return sidebars
  })

  // two level is start of project
  return {
    sidebars,
    hasSidebar: computed(() => path.value !== 'index.md'),
  }
}
