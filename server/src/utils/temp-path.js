const path = require('path')
const uuid = require('./uuid')


module.exports = (name, uid = null) => {
  const uuidMain = uid !== null ? uid() : uuid()

  return {
    archive(folder = null) {
      return !folder
        ? path.resolve(__dirname, '..', '..', `tmp/archives/${uuidMain}--${name}`)
        : path.resolve(__dirname, '..', '..', `tmp/archives/${folder}`)
    },
    decompose(folder = null) {
      return !folder
        ? path.resolve(__dirname, '..', '..', `tmp/decompress/${uuidMain}--${name}`)
        : path.resolve(__dirname, '..', '..', `tmp/decompress/${folder}`)
    },
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
    downLoadPath(folder = null) {
      return path.resolve(__dirname, '..', '..', `tmp/download-archive/${folder}`)
    },
    downLoadReady(folder = null) {
      return path.resolve(__dirname, '..', '..', `tmp/download-ready/${folder}`)
    },
  }
}
