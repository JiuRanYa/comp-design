export function getProjectLink(pro: string, link: string) {
  return `/${pro}${link}`
}

export const navs: Record<string, any> = [
  {
    link: getProjectLink('arsenal-design', '/guide/design'),
    text: '指南',
  },
  {
    link: getProjectLink('arsenal-design', '/components/button'),
    text: '组件',
  },
  {
    link: getProjectLink('arsenal-design', '/hooks/usePopper'),
    text: 'Hooks',
  },
  {
    link: getProjectLink('arsenal-design', '/contribute/start'),
    text: '贡献',
  },
]
function getNav() {
  // const project = getProject()
  //
  // if (navs[project.value]) {
  //   console.warn(`${project.value} nav config not exit, pls add config to nav.ts`)
  // }
  // return navs[project.value]
}

export const nav = getNav()
