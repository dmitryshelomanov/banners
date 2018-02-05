const debug = require('debug')('banner:helpers:handlers:folderTree')
const dirTree = require('directory-tree')


function getHtml(tree) {
  let nameHtml = null

  for (let i = 0; i < tree.children.length; i++) {
    if (tree.children[i].extension === '.html') {
      nameHtml = tree.children[i].name
      break
    }
  }
  if (nameHtml === null) return false
  return { nameHtml, tree }
}

/**
 * Получение дерева каталога
 * @param {*} path
 */
module.exports = async (path) => {
  debug(`tree folder for ${path}`)
  try {
    const tree = await dirTree(path)

    return getHtml(tree)
  }
  catch (error) {
    throw error
  }
}
