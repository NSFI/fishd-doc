const path = require('path')
const chalk = require('chalk')
/**
 * 获取项目路径
 * relative to project root
 */
exports.resolveProject = (...args) => path.resolve(process.cwd(), ...args)
/**
 * 获取包路径
 * relative to cli root
 */
exports.resolveCli = (...args) => path.resolve(__dirname, '../../', ...args)

exports.chalkError = chalk.red
exports.chalkSuccess = chalk.green
exports.chalkWarning = chalk.yellow
exports.chalkProcessing = chalk.blue
