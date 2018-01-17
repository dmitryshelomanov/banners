const debug = require('debug')('banner:compress-folder')
const fs = require('fs-extra')
const {
  tempPath,
  compressFolder,
  folderExists,
  bodyExists,
} = require('../utils')

/**
 * Сжатие архива что бы узнать вес
 * @param {*} ctx
 */
async function compressArchive(ctx) {
  const { body } = ctx.request
  const { nameFolder } = body

  debug('compress folder with body - ', body)

  const { process, compress } = tempPath()

  try {
    await compressFolder(process(nameFolder), compress(`${nameFolder}/banner.zip`))
    const stat = await fs.stat(compress(`${nameFolder}/banner.zip`))

    ctx.body = { size: stat.size }
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  bodyExists(['nameFolder']),
  folderExists(tempPath().process), compressArchive
)
