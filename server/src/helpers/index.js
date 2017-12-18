const isZipFile = require('./handlers/upload/is-zip-file')
const notEmptyFile = require('./handlers/upload/not-empty')
const maxSizeFile = require('./handlers/upload/max-size-file')
const uuid = require('./uuid')
const decompress = require('./handlers/decompress')
const folderTree = require('./handlers/folder-tree')
const tempPath = require('./temp-path')
const compressImage = require('./handlers/compress-img')
const copyFolder = require('./handlers/copy-folder')
const compressPercent = require('./handlers/get-pecent')
const compressFolder = require('./handlers/compress-folder')


module.exports = {
  isZipFile,
  notEmptyFile,
  uuid,
  decompress,
  folderTree,
  maxSizeFile,
  tempPath,
  compressImage,
  copyFolder,
  compressPercent,
  compressFolder,
}
