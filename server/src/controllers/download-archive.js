const debug = require('debug')('banner:download-archive')
const fs = require('fs-extra')
const {
  tempPath,
  compressFolder,
  folderExists,
  copyFolder,
} = require('../utils')


async function downloadArchive(ctx) {
  const { body } = ctx.request
  const { nameFolder } = body
  const { process, downLoadPath, gifReady, downLoadReady } = tempPath()

  debug('download archive with body - ', body)

  try {
    await Promise.all([
      compressFolder(process(nameFolder), downLoadPath(`${nameFolder}/banner.zip`)),
      copyFolder(gifReady(`${nameFolder}/banner.gif`), downLoadPath(`${nameFolder}/banner.gif`)),
    ])
    await compressFolder(downLoadPath(nameFolder), downLoadReady(`${nameFolder}/service-archive.zip`))

    ctx.body = `${nameFolder}/service-archive.zip`
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  folderExists(tempPath().downLoadPath), folderExists(tempPath().downLoadReady), downloadArchive
)
