const debug = require('debug')('banner:controller:folder-exists')
const fs = require('fs-extra')
const { tempPathGenerated } = require('../temp-path')

/**
 * Проверка наличия папки
 * Если нету создать
 * @param {*} type тип для проверки
 */
module.exports = (type) => async (ctx, next) => {
  const { body } = ctx.request
  const { nameFolder } = body
  const checkPath = tempPathGenerated()
  const path = checkPath(type, nameFolder)

  debug(`folder exists with folder name - ${path}, body - ${JSON.stringify(body)}`)
  try {
    if (!await fs.exists(path)) {
      await fs.mkdir(path)
    }
    return await next()
  }
  catch (error) {
    ctx.status = 404
    ctx.body = `folder ${nameFolder} not found`
  }
}
