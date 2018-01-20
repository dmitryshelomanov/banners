const debug = require('debug')('banner:upload-banner')
const fs = require('fs-extra')
const {
  types,
  tempPathGenerated,
  isZipFile,
  notEmptyFile,
  maxSizeFile,
  decompress,
  folderTree,
  copyFolder,
} = require('../utils')

/**
 * Загрузка архива на сервер
 * Возврат дерева каталога
 */
async function lastLoaded(ctx) {
  const { files } = ctx.request
  const tmpPath = tempPathGenerated(files.archive.name)

  debug(`upload banner with archive - ${files.archive.name}`)
  try {
    await fs.rename(files.archive.path, tmpPath(types.ARCHIVE))
    await decompress(tmpPath(types.ARCHIVE), tmpPath(types.DECOMPRESS))
    await copyFolder(tmpPath(types.DECOMPRESS), tmpPath(types.PROCESS))
    ctx.body = await folderTree(tmpPath(types.DECOMPRESS))
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  notEmptyFile,
  maxSizeFile(3000),
  isZipFile,
  lastLoaded,
)
