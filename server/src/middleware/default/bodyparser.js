const parser = require('koa-bodyparser')


exports.init = app => app.use(parser())
