const isZipFile = require('./handlers/upload/is-zip-file')
const notEmptyFile = require('./handlers/upload/not-empty')
const maxSizeFile = require('./handlers/upload/max-size-file')
const uuid = require('./uuid')
const decompress = require('./handlers/decompress')
const folderTree = require('./handlers/folder-tree')
const { types, tempPathGenerated } = require('./temp-path')
const compressImage = require('./handlers/compress-img')
const copyFolder = require('./handlers/copy-folder')
const compressPercent = require('./handlers/get-pecent')
const compressFolder = require('./handlers/compress-folder')
const folderExists = require('./handlers/folder-exists')
const gifEncoder = require('./handlers/gif-encoder')
const caheDeleted = require('./handlers/cache-deleted')
const bodyExists = require('./handlers/exists-body-param')
const firmware = require('./firmware')
const areaExists = require('./handlers/area-exists')


module.exports = {
  isZipFile,
  notEmptyFile,
  uuid,
  decompress,
  folderTree,
  maxSizeFile,
  types,
  tempPathGenerated,
  compressImage,
  copyFolder,
  compressPercent,
  compressFolder,
  folderExists,
  gifEncoder,
  caheDeleted,
  firmware,
  bodyExists,
  areaExists,
}
