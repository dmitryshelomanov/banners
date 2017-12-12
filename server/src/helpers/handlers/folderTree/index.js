const debug = require('debug')('banner:helpers:handlers:folderTree')
const dirTree = require('directory-tree')


module.exports = path => {
  debug(`tree folder for ${path}`)
  return dirTree(path)
}