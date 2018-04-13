const webpack = require('webpack')
const webpackConfigs = require('./webpack.config.js')
const chalk = require('chalk')

webpack(webpackConfigs, (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(chalk.red(info.errors))
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
})
