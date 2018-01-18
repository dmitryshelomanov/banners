const debug = require('debug')('banner:download-archive')
const {
  tempPath,
  compressFolder,
  folderExists,
  copyFolder,
  bodyExists,
} = require('../utils')


async function downloadArchive(ctx) {
  const { body } = ctx.request
  const { nameFolder, areaName } = body
  const { downLoadPath, gifReady, downLoadReady, area } = tempPath()

  debug('download archive with body - ', body)

  try {
    await Promise.all([
      compressFolder(area(nameFolder, areaName), downLoadPath(`${nameFolder}/banner.zip`)),
      copyFolder(gifReady(`${nameFolder}/banner.gif`), downLoadPath(`${nameFolder}/banner.gif`)),
    ])
    await compressFolder(downLoadPath(nameFolder), downLoadReady(`${nameFolder}/service-archive-${areaName}.zip`))

    ctx.body = `${nameFolder}/service-archive-${areaName}.zip`
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  bodyExists(['nameFolder', 'areaName']),
  folderExists(tempPath().downLoadPath),
  folderExists(tempPath().downLoadReady),
  downloadArchive,
)
