const imagemin = require('imagemin')
const imageminJpegoptim = require('imagemin-jpegoptim')
const imageminPngquant = require('imagemin-pngquant')


module.exports = async (file, output, quality) => await imagemin([file], output, {
  plugins: [
    imageminJpegoptim({ max: quality }),
    imageminPngquant({ quality: quality })
  ]
})
