const { exec } = require('child_process')
const chalk = require('chalk')
const { log } = console
const args = process.argv
// get current directory
const cwd = process.cwd()
const resposityName = args[5]

if (!resposityName) {
  console.log(chalk.red('please define a project name'))
  process.exit(1)
}

function getTemplate (respo) {
  log(chalk.green('genreate template please wait ...'))
  exec(`git clone https://github.com/hopperhuang/webpack-multipage.git ${respo}`, function getTemplageCallBack (error, stdout, stderr) {
    if (error) {
      console.error(chalk.red(error))
    } else {
      log(chalk.green('template generated'))
      installResposity()
    }
  })
}

function installResposity () {
  // to check cnpm exist or not
  log(chalk.green('install resposity, please waiting'))
  exec('which cnpm', (error, stdout, stderr) => {
    // cnpm not exist, install by npm
    if (error) {
      npmInstall()
    } else { // cnpm exists, install by cnpm
      cnpmInstall()
    }
  })
}

function cnpmInstall () {
  exec(`cd ${resposityName} && cnpm install`, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(error))
    } else {
      log('finish init')
    }
  })
}

function npmInstall () {
  exec(`cd ${resposityName} && npm install`, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(error))
    } else {
      log('finish init')
    }
  })
}

exec(`rm -rf ${cwd}/${resposityName}`, function removeFolder (error, stdout, stderr) {
  log(chalk.green('remove resposity please wait ...'))
  if (error) {
    console.error(chalk.red(error))
    process.exit(1)
  } else {
    log(chalk.green('resposity has removed'))
    // get templates from git
    getTemplate(resposityName)
  }
})
