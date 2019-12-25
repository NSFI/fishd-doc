## 七鱼文档库解决方案

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