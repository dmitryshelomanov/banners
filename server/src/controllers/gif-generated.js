const debug = require('debug')('banner:controller:gif-generated')
const fs = require('fs-extra')
const getPixels = require('get-pixels')
const GIFEncoder = require('gifencoder')
const {
  tempPath,
  folderExists,
  gifEncoder,
} = require('../helpers')


async function generatedGif(ctx) {
  const { body } = ctx.request
  const { gifReady } = tempPath()
  const { nameFolder, imgData } = body
  const pathReadyGif = gifReady(`${nameFolder}/banner.gif`)


  try {
    gifEncoder(imgData, pathReadyGif)
    ctx.body = 'gif ready'
  }
  catch(error) {
    ctx.throw(error)
  }
}

module.exports = (router, url) => router.post(
  url,
  folderExists(tempPath().gifReady), generatedGif
)
