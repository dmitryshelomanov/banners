const debug = require('debug')('banner:helpers:handlers:folderTree')
const dirTree = require('directory-tree')


module.exports = async (path) => {
  debug(`tree folder for ${path}`)
  await dirTree(path)
}
