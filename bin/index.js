const chalk = require('chalk')
const {fork} = require('child_process')
const { log } = console
const args = process.argv
const pkg = require('../package.json')

// cmd || cmd init || cmd generate || cmd dev || cmd build || cmd -v || cmd --version

const script = args[2]

function showVersion () {
  log(chalk.green(pkg.version))
}

const scriptHandler = {
  '-v': () => {
    showVersion()
  },
  '--version': () => {
    showVersion()
  },
  init () {
    // fork an child process according script
    const proc = fork(
      require.resolve(`./${script}.js`),
      args,
      {
        stdio: 'inherit'
      }
    )
    // stop process
    proc.once('exit', code => {
    //   log('child process exit, main process exit')
      process.exit(code)
    })
    // kill child process
    process.once('exit', () => {
    //   log('process exit, child process kill')
      proc.kill()
    })
  }
}
// actions exist
if (script) {
  const handler = scriptHandler[script]
  // action accepted
  if (handler) {
    handler()
  } else { // action no accepted
    log(`Unknown script ${chalk.cyan(script)}.`)
  }
} else { // actions do not exist
  log(chalk.blue('please tell me what do u want me to do!!'))
}
