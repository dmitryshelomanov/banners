const path = require('path')
const uuid = require('./uuid')


const types = {
  DECOMPRESS: 'decompress',
  ARCHIVE: 'archive',
  COMPRESS: 'compress',
  DOWNLOAD_ARCHIVE: 'download-archive',
  DOWNLOAD_READY: 'download-ready',
  GIF: 'gif',
  GIF_ORIGINAL: 'gif-original',
  GIF_READY: 'gif-ready',
  PROCESS: 'process',
  FIRMWARE: 'firmware',
}

function tempPathGenerated(name = null, testUiid = null) {
  const uuidMain = testUiid ? testUiid() : uuid()

  return function tmpPath(type, folder = null, area = null) {
    const str = !folder ? `tmp/${type}/${uuidMain}--${name}`
      : area ? `tmp/${type}/${folder}/${area}` : `tmp/${type}/${folder}`

    return path.resolve(__dirname, '..', '..', str)
  }
}

module.exports = {
  tempPathGenerated,
  types,
}
