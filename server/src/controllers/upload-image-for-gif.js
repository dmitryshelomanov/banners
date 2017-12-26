const debug = require('debug')('banner:controller:upload-image-for-gif')
const fs = require('fs-extra')
const {
  tempPath,
  folderExists,
  copyFolder,
} = require('../utils')

/**
 * Сохраниние картинки для гиф
 * @param {*} ctx
 */
async function uploadImageForGif(ctx) {
  const { body } = ctx.request
  const { gif, gifOriginal } = tempPath()
  const { data, nameFile, nameFolder } = body
  const img = data.replace(/^data:image\/jpeg;base64,/, '')
  const pathFileOriginal = gifOriginal(`${nameFolder}/${nameFile}`)
  const pathFileCopy = gif(`${nameFolder}/${nameFile}`)

  debug(`upload image with nameFile - ${nameFile}`)

  try {
    await fs.writeFile(pathFileOriginal, img, 'base64')
    await copyFolder(pathFileOriginal, pathFileCopy)
    const { size } = await fs.stat(pathFileOriginal)
    let url = pathFileOriginal.split('gif-original\\')[1]

    url = url.replace(/[\\]+/ig, '/')
    ctx.status = 201
    ctx.body = {
      path: pathFileOriginal,
      originalSize: size,
      url,
    }
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, url) => router[method](
  url,
  folderExists(tempPath().gif), folderExists(tempPath().gifOriginal), uploadImageForGif
)
