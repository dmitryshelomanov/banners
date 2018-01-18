const debug = require('debug')('banner:firmware')
const {
  firmware: start,
  bodyExists,
  folderExists,
  tempPath,
} = require('../utils')


async function firmWare(ctx) {
  const { body } = ctx.request

  debug('firmware archive with body - ', body)

  try {
    const data = await start(body)

    if (typeof data === 'boolean') {
      ctx.body = {
        message: 'archive is firmware!',
        areaId: body.areaId,
      }
      return
    }
    ctx.status = data.status
    ctx.body = data.message
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  bodyExists(['nameFolder', 'areaId', 'fileName']),
  folderExists(tempPath().firmware, tempPath().process),
  firmWare,
)
