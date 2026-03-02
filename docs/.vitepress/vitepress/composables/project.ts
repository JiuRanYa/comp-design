import { computed } from 'vue'

export const defaultProject = 'arsenal-design'

export function useProject() {
  const project = defaultProject

  return computed(() => {
    return project
  })
}
