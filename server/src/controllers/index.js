const uploadBanner = require('./upload-banner')
const compressImg = require('./compress-img')
const parseBanner = require('./parse-banner')
const uploadImageForGif = require('./upload-image-for-gif')
const generatedGif = require('./gif-generated')
const updateBorder = require('./border-update')
const downloadArchive = require('./download-archive')
const getMinimalSize = require('./get-minimal-size')
const firmware = require('./firmware')
const getArea = require('./get-area')


module.exports = {
  uploadBanner,
  compressImg,
  parseBanner,
  uploadImageForGif,
  generatedGif,
  updateBorder,
  downloadArchive,
  getMinimalSize,
  firmware,
  getArea,
}
