const cors = require('./default/cors')
const bodyParser = require('./default/body-parser')
const error = require('./default/error')
const formReader = require('./default/form-reader')
const logger = require('./default/logger')
const serve = require('./default/static')


module.exports = (app) => {
  app
    .use(cors)
    .use(formReader)
    .use(bodyParser)
    .use(error)
    .use(logger)
    .use(serve)
}
