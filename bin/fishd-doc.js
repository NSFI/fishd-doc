#! /usr/bin/env node
const commander = require('commander')
const inquirer = require('inquirer')
const createProject = require('../tools/createProject')
const DOC = require('../lib')

// create
commander
  .command('create <projectName>')
  .description('create a project')
  .action(async (projectName) => {
    const {
      description,
      author,
      version
    } = await inquirer.prompt([
      {
        name: 'description',
        type: 'input',
        message: `description:`,
        default: ''
      },
      {
        name: 'author',
        type: 'input',
        message: `author:`,
        default: ''
      },
      {
        name: 'version',
        type: 'input',
        message: `version:`,
        default: '1.0.0'
      }
    ])

    createProject({
      projectName,
      description,
      author,
      version
    })
  })

// run start
commander
  .command('start [options]')
  .description('start a site server')
  .option('-c, --config <path>', 'set config path. defaults to ./doc.config.js')
  .action((cmd, options) => {
    DOC.start(options)
  })

// run build
commander
.command('build [options]')
.description('build a site project')
.option('-c, --config <path>', 'set config path. defaults to ./doc.config.js')
.action((cmd, options) => {
  DOC.build(options)
})

// run dll
commander
.command('dll [options]')
.description('create dll for site project')
.option('-c, --config <path>', 'set config path. defaults to ./doc.config.js')
.action((cmd, options) => {
  DOC.dll(options)
})

commander.parse(process.argv)
