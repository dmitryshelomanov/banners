const debug = require('debug')('banner:index')
const Koa = require('koa')
const Router = require('koa-router')
const { Server } = require('http')
const socket = require('socket.io')
const middleware = require('./src/middleware')
const {
  uploadBanner,
  compressImg,
  compressArchive,
  parseBanner,
  uploadImageForGif,
  generatedGif,
  updateHtmlName,
  updateBorder,
  downloadArchive,
} = require('./src/controllers')
const cacheDelete = require('./src/utils/handlers/cache-deleted')
const { isDelete } = require('./src/config.js')


const router = new Router()
const app = new Koa()

compressImg(router, 'post', '/compress/img')
uploadBanner(router, 'post', '/upload')
compressArchive(router, 'post', '/compress/archive')
parseBanner(router, 'get', '/parse/banner')
uploadImageForGif(router, 'post', '/upload/image')
generatedGif(router, 'post', '/gif/generated')
updateHtmlName(router, 'post', '/archive/name-update')
updateBorder(router, 'post', '/update/border')
downloadArchive(router, 'post', '/download/archive')

middleware(app)

app
  .use(router.routes())

const server = Server(app.callback())
const io = socket(server)
const folder = {}

io.on('connect', (s) => {
  s.on('disconnect', () => {
    if (!isDelete) return
    if (typeof folder[s.id] !== 'undefined') {
      cacheDelete(folder[s.id].nameFolder)
      delete folder[s.id]
    }
  })
  s.on('banner:set-archive-name', (data) => {
    if (!isDelete) return
    folder[s.id] = data
  })
})

server.listen(8000, () => {
  debug('server run!')
})
