const debug = require('debug')('banner:compress-img')
const fs = require('fs-extra')
const {
  tempPath,
  compressImage,
  compressPercent,
} = require('../helpers')
const {
  defaultQuality,
} = require('../config')

/**
 * сжатие изображения
 */
async function compressImg(ctx) {
  const { body } = ctx.request
  const { quality, isGif } = ctx.query
  const pathWithOutName = body.url.split('/')
  const { process, gif } = tempPath()

  pathWithOutName.pop()
  const path = isGif ? gif(pathWithOutName.join('\\')) : process(pathWithOutName.join('\\'))
  const pathReady = isGif ? gif(body.url) : process(body.url)

  debug('compress img with body -', body)
  try {
    await compressImage(body.path, path, quality || defaultQuality)
    const { size } = await fs.stat(pathReady)

    ctx.body = {
      name: body.name,
      quality: quality || defaultQuality,
      newSize: size,
      originalSize: body.originalSize,
      percentCompress: compressPercent(body.originalSize, size),
    }
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  compressImg
)
