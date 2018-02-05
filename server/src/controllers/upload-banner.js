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
  caheDeleted,
  uuid,
} = require('../utils')

/**
 * Загрузка архива на сервер
 * Возврат дерева каталога
 * @param ctx { Koa context }
 */
async function lastLoaded(ctx) {
  const { files } = ctx.request
  const u = uuid()
  const tmpPath = tempPathGenerated(files.archive.name, () => u)

  debug(`upload banner with archive - ${files.archive.name}`)
  try {
    await fs.rename(files.archive.path, tmpPath(types.ARCHIVE))
    await decompress(tmpPath(types.ARCHIVE), tmpPath(types.DECOMPRESS))
    await copyFolder(tmpPath(types.DECOMPRESS), tmpPath(types.PROCESS))
    const tree = await folderTree(tmpPath(types.DECOMPRESS))

    if (!tree) {
      ctx.body = 'this folder is not banner-type'
      await caheDeleted(`${u}--${files.archive.name}`)
      return
    }
    ctx.body = tree
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
