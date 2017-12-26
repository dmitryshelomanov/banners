const debug = require('debug')('banner:upload-banner')
const fs = require('fs-extra')
const {
  isZipFile,
  notEmptyFile,
  maxSizeFile,
  decompress,
  folderTree,
  tempPath,
  copyFolder,
} = require('../helpers')

/**
 * Загрузка архива на сервер
 * Возврат дерева каталога
 */
async function lastLoaded(ctx) {
  const { files } = ctx.request
  const { archive, decompose, process } = tempPath(files.archive.name)

  debug(`upload banner with archive - ${files.archive.name}`)
  try {
    await fs.rename(files.archive.path, archive)
    await decompress(archive, decompose)
    await copyFolder(decompose, process())
    await fs.unlink(archive)
    ctx.body = await folderTree(decompose)
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  notEmptyFile, maxSizeFile(3000), isZipFile, lastLoaded
)
