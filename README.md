## 七鱼文档库解决方案
![](https://img.shields.io/github/issues/NSFI/fishd-doc)
![](https://img.shields.io/github/forks/NSFI/fishd-doc)
![](https://img.shields.io/github/stars/NSFI/fishd-doc)

## [DEMO体验](https://hangaoke1.github.io/fishd-desktop/#/zh-CN/home)

## 快速开始
安装依赖包
```sh
// 稳定版
npm i fishd-doc -g

// beta版本
npm i fishd-doc@next -g
```

创建项目
```sh
fishd-doc create my-project
```

安装依赖
```sh
cd my-project
npm i
```

启动开发环境
```sh
npm run dev
```

编译打包(dll只需执行一次)
```sh
npm run dll
npm run build
```

## 配置说明
```js
/**
 * 定制webpack相关配置
 */
const path = require('path')

module.exports = {
  // 启动端口
  port: 4000,
  // 入口名称，默认值`index`
  entryName: 'site',
  // 主题模版位置
  theme: './site/desktop',
  // html模版路径
  htmlTemplate: path.join(__dirname, './desktop/template.html'),
  // html输出名称，默认值`index`
  htmlFileName: 'index',
  // 文件输出目录
  outputPath: './dist/desktop',
  // 同webpack publicPath
  publicPath: '/',
  // css中引用的资源路径，如果publicPath配置了相对目录，请配置 ../ 使引用目录正确，否则会出现资源引用路径异常，若未配置，则默认使用pulbicPath
  MiniCssExtractPluginPublicPath: '../',
  // dll配置
  dll: {
    name: 'siteDesktop',
    value: [
      'react',
      'react-dom',
      'react-router',
      'codemirror',
      'marked',
      'less',
      'prismjs'
    ]
  },
  // 自定义webpack配置
  webpackConfig (config) {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@docs': path.join(__dirname, './docs'),
      '@': path.join(__dirname, './desktop')
    })
    return config
  }
}

```

## 目录说明
```
.
├── package.json                    // 文件依赖
├── postcss.config.js               // postcss配置文件
├── public                          // 公共资源目录
├── site                            // 主题模版
│   ├── docs                        // 组件文档地址
│   ├── desktop                     // 桌面主题模版
│   ├── doc.desktop.config.js       // 桌面主题配置
│   ├── doc.mobile.config.js        // 预览主题配置
│   └── mobile                      // 预览主题模版
├── source                          // 组件库源代码
│   ├── Button.tsx
│   ├── index.js
│   └── index.less
└── tsconfig.json                    // ts配置文件
```

## 快速创建一个组件及文档
1. 在source目录下开发组件源代码，例如初始化项目中的`Button`组件
2. 在`site/docs/zh-CN`以及`site/docs/en-US`路径下添加markdown文件，添加：组件名、使用场景、组件demo、API使用文档
3. 在desktop/config中配置组件导航，例如
```
{
  key: 'quickStart',    // md文件名称，同时作为路径后缀存在s
  type: 'markdown',     // 文档类型markdown或者react
  name: '快速上手',      // 组件中文名称
  nameEn: 'QuickStart', // 组件英文名称
  published: true,      // 组件是否发布
  component: ''         // 当文档类型是react为必须，并require你编写的组件
}
```

## Markdown书写规范
组件使用场景及其描述

### 组件Demo编写方式1

:::demo 组件Demo的介绍1

```js
render(){
  return(
    <Button type="primary">Button</Button>
  )
}
```

```css
h4{
  font-size: 32px;
}
```
:::

### 组件Demo编写方式2

:::demo 组件Demo的介绍2

```js
class Demo extends React.Component{
  render(){
    return(
      <Button type="primary">Button</Button>
    )
  }
}

ReactDOM.render(<Demo {...context.props}/>,mountNode);
```

```less
h4{
  font-size: 32px;
}
```

:::

> 注意：所有二级标题都将会被渲染成右侧的`Anchor导航`


## 主题模版说明
```
.
├── docs                     // 文档
│   ├── en-US                // 英文文档 markdown
│   └── zh-CN                // 中文文档 markdown
│   └── react                // React组件式文档
├── doc.desktop.config.js    // 主站点配置文件
├── doc.mobile.config.js     // Demo配置文件
├── desktop                  // 主站点源码
└── mobile                   // Demo源码
```

## 路由说明
项目会自动根据nav的key来生成对应的组件文档路由
1. 对于desktop站点会生成以下组件路由
```
/#/zh-CN/components/button
```
2. 对于mobile站点会生成以下组件路由`如果demo配置的是非本项目提供的，请注意路径设计`
```
/#/zh-CN/button
```

## 注意事项
1. 非web项目组件库请务使用移动端模版，因为无法直接编译非web端组件到页面中，请自行实现h5预览，并通过修改docs/config中的预览地址，实现文档开发。
2. 项目持续优化中，若有疑问，可以资讯项目开发人员，或者提出issue
