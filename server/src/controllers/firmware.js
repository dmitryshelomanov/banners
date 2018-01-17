const debug = require('debug')('banner:firmware')
const {
  firmware: start,
  bodyExists,
  folderExists,
  areaExists,
  tempPath,
  copyFolder,
} = require('../utils')


async function firmWare(ctx) {
  const { body } = ctx.request
  const { process, area } = tempPath()
  const { area: areaBody, nameFolder, fileName } = body
  const folderPath = process(nameFolder)
  const areaPath = area(nameFolder, areaBody)

  debug('firmware archive with body - ', body)

  try {
    await copyFolder(folderPath, areaPath)
    await start(body)
    ctx.body = 'archive is firmware!'
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  bodyExists(['nameFolder', 'area', 'fileName']),
  folderExists(tempPath().firmware),
  areaExists(tempPath().area),
  firmWare,
)
