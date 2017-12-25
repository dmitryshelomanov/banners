const cors = require('./default/cors')
const bodyParser = require('./default/body-parser')
const error = require('./default/error')
const formReader = require('./default/form-reader')
const logger = require('./default/logger')
const tmp = require('./default/tmp')
const publ = require('./default/public')


module.exports = (app) => {
  app
    .use(cors)
    .use(formReader)
    .use(bodyParser)
    .use(error)
    .use(logger)
    .use(publ)
    .use(tmp)
}
