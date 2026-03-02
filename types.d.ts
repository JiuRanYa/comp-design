// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Button: (typeof import('arsenal-design'))['Button']
    CollapseTransition: (typeof import('arsenal-design'))['CollapseTransition']
  }

  interface ComponentCustomProperties {}
}

export {}
