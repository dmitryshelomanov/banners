const Koa = require('koa')
const Router = require('koa-router')
const debug = require('debug')('banner:index')
const middleware = require('./src/middleware')
const { 
  uploadBanner,
  compressImg,
  showBanner
} = require('./src/controllers')

const router = new Router()
const app = new Koa()

compressImg(router, '/compress/img')
uploadBanner(router, '/upload')
showBanner(router, '/show/banner')

middleware(app)

app  
  .use(router.routes())
  .listen(8000, () => { 
    debug('server run on port: 8000')
  })
