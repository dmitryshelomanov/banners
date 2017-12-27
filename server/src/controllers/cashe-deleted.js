const debug = require('debug')('banner:cashe-deleted')
const fs = require('fs-extra')
const {
  tempPath,
} = require('../utils')

/**
 * Сжатие архива что бы узнать вес
 * @param {*} ctx
 */
async function cacheDelete(ctx) {
  const { body } = ctx.request
  const { nameFolder } = body

  debug('delete user cache for folder name - ', nameFolder)
  try {
    for (const pop in tempPath()) {
      const folder = tempPath()[pop](nameFolder)

      if (await fs.exists(folder)) {
        await fs.remove(folder)
      }
    }
    ctx.body = 'file removed'
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  cacheDelete
)
