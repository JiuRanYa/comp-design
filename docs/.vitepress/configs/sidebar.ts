export const siderbarsConfig: SidebarsConfig = {
  guide: [
    {
      text: '指南',
      children: [
        { text: '设计', link: '/guide/design' },
        { text: '快速安装', link: '/guide/installation' },
        { text: '快速上手', link: '/guide/quick-start' },
        { text: '全局配置', link: '/guide/global-config' },
        { text: '样式配置', link: '/guide/style-config' },
        { text: '国际化', link: '/guide/i18n' },
        { text: '在Nuxt中使用', link: '/guide/nuxt-module' },
      ],
    },
  ],
  components: [
    {
      text: '资源组件',
      children: [{ text: 'Icon 图标', link: '/components/icon' }],
    },
    {
      text: '数据录入',
      children: [
        { text: 'Button 按钮', link: '/components/button' },
      ],
    },
  ],
  hooks: [
    {
      text: '功能',
      children: [
        { text: 'usePopper', link: '/hooks/usePopper' },
      ],
    },
    {
      text: '事件',
      children: [
        { text: 'useHover', link: '/hooks/useHover' },
        { text: 'useClickOutside', link: '/hooks/useClickOutside' },
        { text: 'useEventListener', link: '/hooks/useEventListener' },
        { text: 'useSetTimeout', link: '/hooks/useSetTimeout' },
        { text: 'useResizeObserver', link: '/hooks/useResizeObserver' },
      ],
    },
  ],
  cdn: [
    {
      text: '图标库',
      children: [
        { text: '指南', link: '/cdn/icon' },
        { text: 'Solid', link: '/cdn/solid' },
        { text: 'Brands', link: '/cdn/brands' },
        { text: 'Regular', link: '/cdn/regular' },
        { text: 'Mixpanel', link: '/cdn/mixpanel' },
      ],
    },
  ],
  contribute: [
    {
      text: '开发',
      children: [
        { text: '启动项目', link: '/contribute/start' },
        { text: '开发命令', link: '/contribute/server' },
        { text: '新增图片', link: '/contribute/icon' },
      ],
    },
    {
      text: '项目设计',
      children: [
        { text: '指南', link: '/contribute/project/guide' },
        { text: '新增项目', link: '/contribute/project/new' },
      ],
    },
    {
      text: '书写文档',
      children: [
        { text: '指南', link: '/contribute/docs' },
        { text: '自定义head', link: '/contribute/og' },
        { text: 'Markdown插件', link: '/contribute/mk-plugin' },
      ],
    },
  ],
}

export interface SideConfigItem {
  text: string
  children: ConfigItem[]
}
export interface ConfigItem {
  text: string
  link: string
}

type SidebarsConfig = Record<string, SideConfigItem[]>

export default siderbarsConfig
