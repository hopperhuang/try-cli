#!/usr/bin/env node

const program = require('commander')
// const co = require('co')
// const prompt = require('co-prompt')
const pkg = require('../package.json')
console.log(2333)
program
  .version(pkg.version, '-v, --version')
  .command('init [name]', 'init your project')
  .parse(process.argv)
if (program.args.length === 0) {
  program.help()
}
