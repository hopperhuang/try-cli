const Glob = require('glob')

const cwd = process.cwd()

function getFiles () {
  let filenames
  const reg = new RegExp(`^${cwd}\\/src\\/pages\\/(.+)\\/index.js$`)
  console.log(reg)
  let files = Glob.sync(`${cwd}/src/pages/**/index.js`)
  const _filenames = files.map(file => reg.exec(file))
  filenames = _filenames.map(file => [file[1], file[0]])
  return filenames
}

module.exports = getFiles
