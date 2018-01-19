const debug = require('debug')('banner:index')
const Koa = require('koa')
const { Server } = require('http')
const socket = require('socket.io')
const middleware = require('./src/middleware')
const apiRoutes = require('./src/routes/api')
const cacheDelete = require('./src/utils/handlers/cache-deleted')
const { isDelete } = require('./src/config.js')
const { sequelize } = require('./src/models')


const app = new Koa()

middleware(app)

app
  .use(apiRoutes.routes())

const server = Server(app.callback())
const io = socket(server)
const folder = {}

function deleteCacheHelper(s) {
  if (!isDelete) return
  if (typeof folder[s.id] !== 'undefined') {
    cacheDelete(folder[s.id].nameFolder)
    delete folder[s.id]
  }
}

io.on('connect', (s) => {
  s.on('disconnect', () => {
    deleteCacheHelper(s)
  })
  s.on('banner:set-archive-name', (data) => {
    if (!isDelete) return
    folder[s.id] = data
  })
  s.on('banner:delete-cache', (data) => {
    deleteCacheHelper(s)
  })
})

sequelize
  .authenticate()
  .then(() => {
    debug('db connected')
    server.listen(8000, () => {
      debug('server run!')
    })
  })
