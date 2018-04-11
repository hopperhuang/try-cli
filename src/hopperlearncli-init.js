#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const { exec } = require('child_process')
const { log } = console

program.action(function (name, cmd) {
  const dir = process.cwd()
  log(chalk.green('remove conflict folder'))
  // process.exit(1)
  // remove exist file
  exec(`rm ${name}`, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(error))
      process.exit(1)
    } else {
      log(chalk.green('clone template'))
      // clone template
      exec(`git clone https://github.com/hopperhuang/webpack-multipage.git ${dir}/${name}`, (error, stdout, stderr) => {
        if (error) {
          console.error(error)
          process.exit(1)
        } else {
          log(chalk.green('install dependencies'))
          exec(`which cnpm`, (error, stdout, stderr) => {
            if (error) {
              exec(`cd ${name} && npm install`, (error, stdout, stderr) => {
                if (error) {
                  console.error(error)
                  process.exit(1)
                } else {
                  log(chalk.green('finish init, please wait'))
                }
              })
            } else {
              exec(`cd ${name} && cnpm install`, (error, stdout, stderr) => {
                if (error) {
                  console.error(error)
                  process.exit(1)
                } else {
                  log(chalk.green('finish init'))
                }
              })
            }
          })
        }
      })
    }
  })
})

program.parse(process.argv)
if (process.argv.length < 3) {
  log(chalk.red('you need to provide a resposity name'))
}
