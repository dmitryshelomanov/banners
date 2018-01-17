const debug = require('debug')('banner:util:area-exists')
const fs = require('fs-extra')


module.exports = path => async (ctx, next) => {
  const { body } = ctx.request
  const { nameFolder, area } = body
  const pathFolder = path(nameFolder, area)

  debug(`file exists with folder path - ${area}`)
  try {
    const folder = await fs.exists(pathFolder)

    if (!folder) await fs.mkdir(pathFolder)
    return await next()
  }
  catch (error) {
    ctx.throw(error)
  }
}
