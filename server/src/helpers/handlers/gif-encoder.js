const getPixels = require('get-pixels')
const GIFEncoder = require('gifencoder')

module.exports = function wrapGif (imgData, pathReadyGif) {
  const { w, h, images, repeat } = imgData
  const { path, delay } = images
  const gif = new GIFEncoder(w, h)
  const stream = fs.createWriteStream(pathReadyGif)


  gif.pipe(stream)
  gif.setQuality(20)
  gif.setDelay(500)
  gif.writeHeader()
  gif.setRepeat(repeat)
  return function addToGif(images, counter = 0) {
    getPixels(path, function(err, pixels) {
      gif.setDelay(delay)
      gif.addFrame(pixels.data)
      gif.read()
      if (counter === images.length - 1) return gif.finish()
      addToGif(images, ++counter)
    })
  }
}
