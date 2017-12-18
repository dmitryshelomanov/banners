const debug = require('debug')('banner:compress-img')
const fs = require('fs-extra')
const path = require('path')
const {
  tempPath,
  compressImage,
  compressPercent,
} = require('../../helpers')
const {
  defaultQuality,
} = require('../../config')


async function compressImg(ctx) {
  const { body } = ctx.request
  const { quality } = ctx.query

  debug(`compress img with body - ${body}`)

  const pathWithOutName = body.url.split('/')

  pathWithOutName.pop()

  const { process } = tempPath()

  await compressImage(body.path, process(pathWithOutName.join('\\')), quality || defaultQuality)
  const { size } = await fs.stat(process(body.url))

  ctx.body = {
    name: body.name,
    quality: quality || defaultQuality,
    newSize: size,
    originalSize: body.originalSize,
    percentCompress: compressPercent(body.originalSize, size),
  }
}

module.exports = (router, uri) => router.post(
  uri,
  compressImg
)
