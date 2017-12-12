const cors = require('koa2-cors')


exports.init = app => app.use(cors())
