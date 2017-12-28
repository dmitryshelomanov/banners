const uploadBanner = require('./upload-banner')
const compressImg = require('./compress-img')
const compressArchive = require('./compress-archive')
const parseBanner = require('./parse-banner')
const uploadImageForGif = require('./upload-image-for-gif')
const generatedGif = require('./gif-generated')
const updateHtmlName = require('./update-html-name')
const updateBorder = require('./border-update')


module.exports = {
  uploadBanner,
  compressImg,
  compressArchive,
  parseBanner,
  uploadImageForGif,
  generatedGif,
  updateHtmlName,
  updateBorder,
}
