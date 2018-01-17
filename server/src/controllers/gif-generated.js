const debug = require('debug')('banner:controller:gif-generated')
const {
  tempPath,
  folderExists,
  gifEncoder,
  bodyExists,
} = require('../utils')

/**
 * генерация гиф
 * @param {*} ctx
 */
async function generatedGif(ctx) {
  const { body } = ctx.request
  const { gifReady } = tempPath()
  const { nameFolder, imgData } = body
  const pathReadyGif = gifReady(`${nameFolder}/banner.gif`)

  debug(`generate gif with nameFolder - ${nameFolder}`, imgData)
  try {
    await gifEncoder(imgData, pathReadyGif)
    ctx.body = `${nameFolder}/banner.gif`
  }
  catch (error) {
    debug('handle error - ', error)
    ctx.throw(error)
  }
}

module.exports = (router, method, url) => router[method](
  url,
  bodyExists(['nameFolder', 'imgData']),
  folderExists(tempPath().gifReady),
  generatedGif,
)
