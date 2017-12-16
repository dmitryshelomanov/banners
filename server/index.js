const Koa = require('koa')
const Router = require('koa-router')
const debug = require('debug')('banner:index')
const middleware = require('./src/middleware')
const fs = require('fs-extra')
const { tempPath } = require('./src/helpers')
const { 
  uploadBanner,
  compressImg,
  showBanner,
  compressArchive,
} = require('./src/controllers')


const router = new Router()
const app = new Koa()

compressImg(router, `/compress/img`)
uploadBanner(router, `/upload`)
compressArchive(router, `/compress/archive`)

router.post(`/base64`, async (ctx) => {
  const { body } = ctx.request
  const { process } = tempPath()
  let data = JSON.parse(body.data)

  try {
    data.forEach(async (i, k) => {
      let b = i.replace(/^data:image\/jpeg;base64,/, '')
      await fs.writeFile(process(`8b9a9c0bcfd045ef19e38861968cef3a--240x400.zip\\test\\${k}.jpeg`), b, 'base64')
    })
  }
  catch (err) {
    ctx.throw(err)
  }

  ctx.body = body.data.lenght
})

router.get(`/test`, async (ctx) => {
  const { process } = tempPath()
  ctx.set('Content-type', 'text/plan')
  ctx.body = await fs.readFile(process(`8b9a9c0bcfd045ef19e38861968cef3a--240x400.zip\\240x400.html`))
})

middleware(app)

app  
  .use(router.routes())
  .listen(8000, () => { 
    debug(`server run on port: 8000`)
  })
