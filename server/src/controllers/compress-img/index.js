const debug = require('debug')('banner:compress-img')
const fs = require('mz/fs')
const path = require('path')
const {
  tempPath,
  compressImage
} = require('../../helpers')


async function compressImg(ctx) {
  const { body } = ctx.request
  debug(`compress img with body -`, body)

  let copyPath = body.url.split('\\')
  copyPath.pop()

  const { process } = tempPath(copyPath.join('\\'))

  await compressImage(body.path, process, 10)
  ctx.body = true
}

module.exports = (router, path) => router.post(
  path,
  compressImg
)
