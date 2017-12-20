const debug = require('debug')('banner:controller:upload-image-for-gif')
const fs = require('fs-extra')
const {
  tempPath,
} = require('../../helpers')


async function uploadImageForGif(ctx) {
  const { body } = ctx.request
  const { gif } = tempPath()
  const { data, nameFile, nameFolder } = body

  const img = data.replace(/^data:image\/jpeg;base64,/, '')
  const pathFile = gif(`${nameFile}.jpg`)
  const pathFolder = gif(nameFolder)

  debug(`upload image with nameFile - ${nameFile}, nameFolder - ${nameFolder}`)
  if (!await fs.exists(pathFolder)) {
    await fs.mkdir(pathFolder)
  }
  await fs.writeFile(pathFile, img, 'base64')
  let url = pathFile.split('tmp\\')[1]

  url = url.replace(/[\\]+/ig, '/')

  ctx.status = 201
  ctx.body = {
    pathFile,
    url,
  }
}

module.exports = (router, url) => router.post(
  url,
  uploadImageForGif
)
