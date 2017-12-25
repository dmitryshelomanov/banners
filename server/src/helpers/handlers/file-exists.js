const debug = require('debug')('banner:controller:upload-image-for-gif')
const fs = require('fs-extra')


module.exports = path => async (ctx, next) => {
  const { body } = ctx.request
  const { nameFolder } = body
  const pathFolder = path(nameFolder)

  debug(`file exists with folder path - ${pathFolder}`)
  if (!nameFolder) {
    ctx.status = 404
    ctx.body = 'nameFolder is undefined'
    return
  }

  try {
    const folder = await fs.exists(pathFolder)

    if (!folder) await fs.mkdir(pathFolder)
    await next()
  }
  catch (error) {
    ctx.throw(error)
  }
}
