const debug = require('debug')('banner:controller:stub-generated')
const fs = require('fs-extra')
const {
  types,
  tempPathGenerated,
  folderExists,
  gifEncoder,
  bodyExists,
} = require('../utils')


function stub(condition, {
  pathReadyGif, pathReadyJpg, data,
}) {
  async function jpg() {
    await fs.writeFile(pathReadyJpg, data, {
      encoding: 'base64',
      mode: Number.parseInt('0777', 8),
    })
    const { size } = await fs.stat(pathReadyJpg)

    return size
  }

  async function gif() {
    await gifEncoder(data, pathReadyGif)
    const { size } = await fs.stat(pathReadyGif)

    return size
  }

  return condition ? gif : jpg
}

/**
 * генерация stub
 * @param {*} ctx
 */
async function stubGenerated(ctx) {
  const { body } = ctx.request
  const tmpPath = tempPathGenerated()
  const { nameFolder, imgData } = body
  const pathReadyGif = tmpPath(types.GIF_READY, `${nameFolder}/banner.gif`)
  const pathReadyJpg = tmpPath(types.GIF_READY, `${nameFolder}/banner.jpeg`)

  debug(`generate stub with nameFolder - ${nameFolder}`, imgData)
  try {
    const callfn = stub(imgData.isGif, {
      pathReadyGif,
      pathReadyJpg,
      data: !Array.isArray(imgData.data) ? imgData.data.replace(new RegExp('^data:image\\/jpeg;base64,'), '') : imgData,
      nameFolder,
    })

    const size = await callfn.call(ctx)

    ctx.body = size
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, url) => router[method](
  url,
  bodyExists(['nameFolder', 'imgData']),
  folderExists(types.GIF_READY),
  stubGenerated,
)
