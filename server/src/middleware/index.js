const fs = require('mz/fs')
const debug = require('debug')('banner:middleware')
const cors = require('./default/cors')
const bodyParser = require('./default/body-parser')
const error = require('./default/error')
const formReader = require('./default/form-reader')
const logger = require('./default/logger')
const static = require('./default/static')


module.exports = app => {
  app 
    .use(cors)  
    .use(formReader)
    .use(bodyParser)
    .use(error)
    .use(logger)
    .use(static)
}
