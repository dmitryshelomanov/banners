const debug = require('debug')('banner:helpers:handlers:folderTree')
const dirTree = require('directory-tree')


module.exports = async (path) => {
  debug(`tree folder for ${path}`)
  try {
    const tree = await dirTree(path)

    return tree
  }
  catch (error) {
    throw error
  }
}
