const debug = require('debug')('banner:firmware')
const {
  firmware: start,
  bodyExists,
  folderExists,
  types,
} = require('../utils')

/**
 * Прошивка банера
 * Используется утилита firmware
 */
async function firmWare(ctx) {
  const { body } = ctx.request

  debug('firmware archive with body - ', body)

  try {
    await start(body)

    ctx.body = {
      message: 'archive is firmware!',
      areaId: body.areaId,
    }
  }
  catch (error) {
    ctx.status = error.status
    ctx.body = error.message
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  bodyExists(['nameFolder', 'areaId', 'fileName']),
  folderExists(types.FIRMWARE),
  firmWare,
)
