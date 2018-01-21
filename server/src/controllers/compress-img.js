const debug = require('debug')('banner:compress-img')
const fs = require('fs-extra')
const {
  types,
  tempPathGenerated,
  compressImage,
  compressPercent,
  bodyExists,
  replacePath,
} = require('../utils')
const {
  defaultQuality,
} = require('../config')

/**
 * сжатие изображения
 */
async function compressImg(ctx) {
  const { body } = ctx.request
  const { quality, isGif } = ctx.query
  const { replacer, type, path, name } = body
  const tmpPath = tempPathGenerated()

  if (Object.values(types).indexOf(type) === -1) {
    ctx.status = 404
    ctx.body = `type ${type} not found in types`
    return
  }
  debug('compress img with body -', body)
  try {
    const pathChankWithName = path.split(replacer)[1]
    const pathChankWithoutName = pathChankWithName.split(name)[0]

    await compressImage(path, tmpPath(type, pathChankWithoutName), quality || defaultQuality)
    const { size } = await fs.stat(tmpPath(type, pathChankWithName))

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
  bodyExists(['replacer', 'type', 'path', 'name']),
  compressImg,
)
