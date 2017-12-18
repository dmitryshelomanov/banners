const parser = require('koa-bodyparser')


module.exports = parser({
  formLimit: '3000kb',
})
