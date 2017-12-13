const path = require('path')
const uuid = require('./uuid')


module.exports = (name) => { 
  const uuidMain = uuid()
  return {
    archive: path.resolve(__dirname, `..`, `..`, `tmp/archives/${uuidMain}--${name}`),
    decompose: path.resolve(__dirname, `..`, `..`, `tmp/decompress/${uuidMain}--${name}`),
    process(folder = null) {
      return !folder
        ? path.resolve(__dirname, `..`, `..`, `tmp/process/${uuidMain}--${name}`)
        : path.resolve(__dirname, `..`, `..`, `tmp/process/${folder}`) 
    }
  }
}
