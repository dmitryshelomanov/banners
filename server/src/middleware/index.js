const fs = require('mz/fs')
const debug = require('debug')('banner:middleware')


module.exports = app => {
  const path = `${__dirname}/default`
  const files = fs.readdirSync(path)

  files.forEach(file => {
    require(`${path}/${file}`).init(app)
    debug(`${file} init`)
  })
}
