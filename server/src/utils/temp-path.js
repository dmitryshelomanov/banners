const path = require('path')
const uuid = require('./uuid')


module.exports = (name, uid = null) => {
  const uuidMain = uid !== null ? uid() : uuid()

  return {
    archive: path.resolve(__dirname, '..', '..', `tmp/archives/${uuidMain}--${name}`),
    decompose: path.resolve(__dirname, '..', '..', `tmp/decompress/${uuidMain}--${name}`),
    process(folder = null) {
      return !folder
        ? path.resolve(__dirname, '..', '..', `tmp/process/${uuidMain}--${name}`)
        : path.resolve(__dirname, '..', '..', `tmp/process/${folder}`)
    },
    compress(folder = null) {
      return !folder
        ? path.resolve(__dirname, '..', '..', `tmp/compress/${uuidMain}--${name}`)
        : path.resolve(__dirname, '..', '..', `tmp/compress/${folder}`)
    },
    gif(fileName = 0) {
      return path.resolve(__dirname, '..', '..', `tmp/gif/${fileName}`)
    },
    gifOriginal(fileName = 0) {
      return path.resolve(__dirname, '..', '..', `tmp/gif-original/${fileName}`)
    },
    gifReady(fileName = 0) {
      return path.resolve(__dirname, '..', '..', `tmp/gif-ready/${fileName}`)
    },
  }
}
