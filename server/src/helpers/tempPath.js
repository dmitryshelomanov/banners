const path = require('path')
const uuid = require('./uuid')


module.exports = (name) => { 
  const uiidMain = uuid()
  return {
    archive: path.resolve(__dirname, `..`, `..`, `tmp/archives/${uiidMain}--${name}`),
    decompose: path.resolve(__dirname, `..`, `..`, `tmp/decompress/${uiidMain}--${name}`),
    process: path.resolve(__dirname, `..`, `..`, `tmp/process/${name}`),
  }
}
