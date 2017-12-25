const debug = require('debug')('banner:index')
const Koa = require('koa')
const Router = require('koa-router')
const middleware = require('./src/middleware')
const {
  uploadBanner,
  compressImg,
  compressArchive,
  parseBanner,
  uploadImageForGif,
  generatedGif,
} = require('./src/controllers')


const router = new Router()
const app = new Koa()

compressImg(router, 'post', '/compress/img')
uploadBanner(router, 'post', '/upload')
compressArchive(router, 'post', '/compress/archive')
parseBanner(router, 'get', '/parse/banner')
uploadImageForGif(router, 'post', '/upload/image')
generatedGif(router, 'post', '/gif/generated')

middleware(app)

app
  .use(router.routes())
  .listen(8000, () => {
    debug('server run on port: 8000')
  })
