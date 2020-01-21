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
  htmlFileName: 'index',
  // 文件输出路径
  outputPath: './dist/mobile',
  // 同webpack publicPath
  publicPath: './',
  // css中引用的资源路径，如果publicPath配置了相对目录，请配置 ../ 使引用目录正确，否则会出现资源引用路径异常，若未配置，则默认使用pulbicPath
  MiniCssExtractPluginPublicPath: '../',
  // dll配置
  dll: {
    name: 'mobile-dll',
    value: [
      'react',
      'react-dom',
      'react-router',
      'marked',
      'less'
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
