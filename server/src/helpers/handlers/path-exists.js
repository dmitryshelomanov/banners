const fs = require('fs-extra')
const {
  tempPath
} = require('../')


module.exports = async (path) => await fs.exists(path)
