const debug = require('debug')('banner:compress-img')
const fs = require('fs-extra')
const {
  types,
  tempPathGenerated,
  compressImage,
  compressPercent,
  bodyExists,
} = require('../utils')
const {
  defaultQuality,
} = require('../config')


function getQ(...args) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] && args[i] !== 'undefined') return args[i]
  }
}

/**
 * сжатие изображения
 */
async function compressImg(ctx) {
  const { body } = ctx.request
  const { quality } = ctx.query
  const { replacer, type, path, name, quality: bodyQuality } = body
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

    await compressImage(
      path,
      tmpPath(type, pathChankWithoutName),
      getQ(quality, bodyQuality, defaultQuality),
    )
    const { size } = await fs.stat(tmpPath(type, pathChankWithName))

    ctx.body = {
      name: body.name,
      quality: getQ(quality, bodyQuality, defaultQuality),
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
