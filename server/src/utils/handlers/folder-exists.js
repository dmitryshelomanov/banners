const debug = require('debug')('banner:controller:folder-exists')
const fs = require('fs-extra')


module.exports = (createPath, oldPath) => async (ctx, next) => {
  const { body } = ctx.request
  const { nameFolder } = body
  const createPathFolder = createPath(nameFolder)

  debug(`folder exists with folder name - ${createPathFolder}`)
  try {
    if (!await fs.exists(createPathFolder)) {
      await fs.mkdir(createPathFolder)
    }
    return await next()
  }
  catch (error) {
    ctx.status = 404
    ctx.body = `folder ${nameFolder} not found in dir ${oldPath(nameFolder)}`
  }
}
