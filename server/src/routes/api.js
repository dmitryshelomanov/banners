const Router = require('koa-router')
const {
  uploadBanner,
  compressImg,
  parseBanner,
  uploadImageForGif,
  generatedGif,
  updateBorder,
  downloadArchive,
  getMinimalSize,
  firmware,
  getArea,
} = require('../controllers')


const router = new Router({ prefix: '/api' })

downloadArchive(router, 'post', '/download/archive')
compressImg(router, 'post', '/compress/img')
uploadBanner(router, 'post', '/upload')
parseBanner(router, 'get', '/parse/banner')
uploadImageForGif(router, 'post', '/upload/image')
generatedGif(router, 'post', '/gif/generated')
updateBorder(router, 'post', '/update/border')
getMinimalSize(router, 'post', '/get/minimal-size')
firmware(router, 'post', '/firmware')
getArea(router, 'get', '/area')

module.exports = router
