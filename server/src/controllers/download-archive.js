const debug = require('debug')('banner:download-archive')
const {
  types,
  tempPathGenerated,
  compressFolder,
  folderExists,
  copyFolder,
  bodyExists,
} = require('../utils')


async function downloadArchive(ctx) {
  const { body } = ctx.request
  const { nameFolder, areaName } = body
  const tmpPath = tempPathGenerated()

  debug('download archive with body - ', body)

  try {
    await Promise.all([
      compressFolder(tmpPath(types.FIRMWARE, nameFolder, areaName), tmpPath(types.DOWNLOAD_ARCHIVE, `${nameFolder}/banner.zip`)),
      copyFolder(tmpPath(types.GIF_READY, `${nameFolder}/banner.gif`), tmpPath(types.DOWNLOAD_ARCHIVE, `${nameFolder}/banner.gif`)),
    ])
    await compressFolder(
      tmpPath(types.DOWNLOAD_ARCHIVE, nameFolder),
      tmpPath(types.DOWNLOAD_READY, `${nameFolder}/service-archive-${areaName}.zip`),
    )
    ctx.body = `${nameFolder}/service-archive-${areaName}.zip`
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  bodyExists(['nameFolder', 'areaName']),
  folderExists(types.DOWNLOAD_ARCHIVE),
  folderExists(types.DOWNLOAD_READY),
  downloadArchive,
)
