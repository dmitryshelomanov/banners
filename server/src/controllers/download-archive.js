const debug = require('debug')('banner:download-archive')
const {
  types,
  tempPathGenerated,
  compressFolder,
  folderExists,
  copyFolder,
  bodyExists,
} = require('../utils')
const getExtension = require('../utils/firmware/get-stub-extension')


const getStubName = (isGif, w, h) => `${w}x${h}${getExtension(isGif)}`
const getName = (w, h) => `${w}x${h}`

async function downloadArchive(ctx) {
  const { nameFolder, areaName, w, h, isGif } = ctx.request.body
  const tmpPath = tempPathGenerated()

  debug('download archive')

  try {
    await Promise.all([
      compressFolder(
        tmpPath(types.FIRMWARE, nameFolder, areaName),
        tmpPath(types.DOWNLOAD_ARCHIVE, `${nameFolder}/${getName(w, h)}.zip`),
      ),
      copyFolder(
        tmpPath(types.GIF_READY, `${nameFolder}/banner${getExtension(isGif)}`),
        tmpPath(types.DOWNLOAD_ARCHIVE, `${nameFolder}/${getStubName(isGif, w, h)}`),
      ),
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
  bodyExists(['nameFolder', 'areaName', 'h', 'w']),
  folderExists(types.DOWNLOAD_ARCHIVE),
  folderExists(types.DOWNLOAD_READY),
  downloadArchive,
)
