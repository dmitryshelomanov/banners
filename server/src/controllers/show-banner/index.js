const debug = require('debug')('banner:show-banner')
const fs = require('fs-extra')
const path = require('path')
const {
  tempPath,
  compressImage,
  compressPercent
} = require('../../helpers')
const {
  defaultQuality
} = require('../../config')


async function showBanner(ctx) {
  const { src } = ctx.query
  debug(`show banner with src -`, src)

  const { process } = tempPath()
  ctx.set('Content-Type', 'text/html')
  ctx.body = await fs.readFile(process('f96b30abd1ee6404a02bdb75270e2ec6--240x400.zip\\240x400.html'))
}

module.exports = (router, path) => router.get(
  path,
  showBanner
)
