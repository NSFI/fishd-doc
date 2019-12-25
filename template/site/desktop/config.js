import { getPlainComponentsList } from './utils'

const isProd = process.env.NODE_ENV === 'production'

export const config = {
  // 组件预览地址
  demoBaseUrl: isProd ? 'http://localhost:3500/#/' : 'http://localhost:4100/#/',
  codeEdit: true,
  'zh-CN': {
    header: {},
    nav: [
      {
        name: '开发指南',
        key: 'development',
        children: [
          {
            key: 'quickStart',
            type: 'markdown',
            name: '快速上手',
            published: true
          },
          {
            key: 'contributing',
            type: 'react',
            name: '色彩',
            component: require('./componentsDoc/ruleColor'),
            published: true
          }
        ]
      },
      {
        name: '通用组件',
        key: 'general',
        children: [
          {
            name: '基础组件 General',
            key: 'baseGeneral',
            children: [
              {
                key: 'button',
                type: 'markdown',
                name: 'Button 按钮',
                published: true
              }
            ]
          }
        ]
      }
    ]
  },
  'en-US': {
    header: {},
    nav: []
  }
}

// TODO: 国际化
export const components = config['zh-CN'].nav

export const plainComponents = getPlainComponentsList(components)
