const debug = require('debug')('banner:controller:folder-exists')
const fs = require('fs-extra')


module.exports = path => async (ctx, next) => {
  const { body } = ctx.request
  const { nameFolder } = body
  const pathFolder = path(nameFolder)

  debug(`folder exists with folder path - ${pathFolder}`)
  try {
    const folder = await fs.exists(pathFolder)

    if (!folder) await fs.mkdir(pathFolder)
    return await next()
  }
  catch (error) {
    ctx.throw(error)
  }
}
