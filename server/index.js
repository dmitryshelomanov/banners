const Koa = require('koa')
const Router = require('koa-router')
const debug = require('debug')('banner:index')
const middleware = require('./src/middleware')

const { uploadBanner } = require('./src/controllers')

const router = new Router()
const app = new Koa()

uploadBanner(router, '/upload')

middleware(app)

app  
  .use(router.routes())
  .listen(8000, () => { 
    debug('server run on port: 8000')
  })