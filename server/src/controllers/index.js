const uploadBanner = require('./upload-banner')
const compressImg = require('./compress-img')
const parseBanner = require('./parse-banner')
const uploadImageForGif = require('./upload-image-for-gif')
const stubGenerated = require('./stub-generated')
const updateBorder = require('./border-update')
const downloadArchive = require('./download-archive')
const getMinimalSize = require('./get-minimal-size')
const firmware = require('./firmware')
const getArea = require('./get-area')
const stoppedBanner = require('./stopped-banner')


module.exports = {
  uploadBanner,
  compressImg,
  parseBanner,
  uploadImageForGif,
  stubGenerated,
  updateBorder,
  downloadArchive,
  getMinimalSize,
  firmware,
  getArea,
  stoppedBanner,
}
