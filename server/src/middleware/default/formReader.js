const form = require('koa2-formidable')


exports.init = app => app.use(form())
