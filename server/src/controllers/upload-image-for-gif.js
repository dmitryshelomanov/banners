const debug = require('debug')('banner:controller:upload-image-for-gif')
const fs = require('fs-extra')
const { ext } = require('../config')
const {
  types,
  tempPathGenerated,
  folderExists,
  copyFolder,
  bodyExists,
} = require('../utils')

/**
 * Сохраниние картинки для гиф
 * @param {*} ctx
 */
async function uploadImageForGif(ctx) {
  const { body } = ctx.request
  const tmpPath = tempPathGenerated()
  const { data, nameFile, nameFolder } = body
  const img = data.replace(new RegExp(`^data:image\\/${ext};base64,`), '')
  const pathFileOriginal = tmpPath(types.GIF_ORIGINAL, `${nameFolder}/${nameFile}`)
  const pathFileCopy = tmpPath(types.GIF, `${nameFolder}/${nameFile}`)

  debug(`upload image with nameFile - ${nameFile} original path - ${pathFileOriginal} path copy - ${pathFileCopy}`)

  try {
    await fs.writeFile(pathFileOriginal, img, {
      encoding: 'base64',
      mode: Number.parseInt('0777', 8),
    })
    await copyFolder(pathFileOriginal, pathFileCopy)
    const { size } = await fs.stat(pathFileOriginal)

    ctx.status = 201
    ctx.body = {
      path: pathFileOriginal,
      originalSize: size,
    }
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, url) => router[method](
  url,
  bodyExists(['data', 'nameFile', 'nameFolder']),
  folderExists(types.GIF),
  folderExists(types.GIF_ORIGINAL),
  uploadImageForGif,
)
