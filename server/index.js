const Koa = require('koa')
const Router = require('koa-router')
const debuger = require('debug')
const logger = require('koa-logger')
const parser = require('koa-bodyparser')

const router = new Router({})
const app = new Koa()

router.get('/', (ctx) => {
  ctx.body = 'Hello koa'
})

router.get('/zip', (ctx) => {
  ctx.body = 'zip'
})

app
  .use(parser())
  .use(router.routes())
  .listen(8000)