const serve = require('koa-static')
const path = require('path')


const root = path.resolve(__dirname, '..', '..', '..', 'tmp')

module.exports = serve(root, {
  setHeaders(res, path, stats) {
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Methods', 'GET')
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }
})
