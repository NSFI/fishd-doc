const fs = require('fs')
const path = require('path')
const resolve = require('resolve')

const defaultConfig = {
  output: './_site'
}

module.exports = function getDocConfig(configFile) {
  const customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  const config = Object.assign({}, defaultConfig, customizedConfig);

  config.theme = resolve.sync(config.theme, { basedir: process.cwd() });
  config.themeDir = path.dirname(config.theme)
  config.entryName = config.entryName || 'index'
  config.htmlFileName = config.htmlFileName || 'index'

  return config;
};