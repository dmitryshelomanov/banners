const form = require('koa2-formidable')


module.exports = form({
  maxFieldsSize: 100 * 1024 * 1024
})
