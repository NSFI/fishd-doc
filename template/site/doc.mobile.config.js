/**
 * 定制webpack相关配置
 */
const path = require('path')

module.exports = {
  // 启动端口
  port: 4100,
  // 入口名称，默认值`index`
  entryName: 'site',
  // 主题模版位置
  theme: './site/mobile',
  // html模版路径
  htmlTemplate: path.join(__dirname, './mobile/template.html'),
  // html输出名称，默认值`index`
  htmlFileName: 'mobile',
  // dll配置
  dll: {
    name: 'siteDll',
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
      '@': path.join(__dirname, './mobile')
    })
    return config
  }
}
