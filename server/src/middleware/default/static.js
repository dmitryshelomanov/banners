const serve = require('koa-static')
const path = require('path')


const root = path.resolve(__dirname, '..', '..', '..', 'tmp/decompress')

module.exports = serve(root)