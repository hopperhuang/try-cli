#!/usr/bin/env node

const program = require('commander')
// const co = require('co')
// const prompt = require('co-prompt')
const pkg = require('./package.json')

program.arguments('<file>')
  .version(pkg.version, '-v, --version')
// .option('-u, --username <username>', 'The user to authenticate as')
  .option('-u, --username <username>', 'your username')
// .option('-p --password <password>', 'The user\'s password')
  .option('-p, --password <password>', 'your password')
// .action((function (file) {
//     co(function *() {
//         const username = yield prompt('username: ');
//         const password = yield prompt.password('password: ');
//         console.log('user: %s password %s file %s', username, password, file)
//     })
// }))
  .action(function (file) {
    console.log('user: %s, password: %s, file: %s', program.username, program.password, file)
  })
  .parse(process.argv)
