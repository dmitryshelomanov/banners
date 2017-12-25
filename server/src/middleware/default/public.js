const serve = require('koa-static')
const path = require('path')


const publ = path.resolve(__dirname, '..', '..', '..', 'public')


module.exports = serve(publ)
