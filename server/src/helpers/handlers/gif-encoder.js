const getPixels = require('get-pixels')
const GIFEncoder = require('gifencoder')
const fs = require('fs-extra')


module.exports = function wrapGif(imgData, pathReadyGif) {
  const { w, h, images, repeat } = imgData
  const { path, delay } = images
  const gif = new GIFEncoder(w, h)
  const stream = fs.createWriteStream(pathReadyGif)
  let counter = 0


  gif.pipe(stream)
  gif.setQuality(20)
  gif.setDelay(0)
  gif.writeHeader()
  gif.setRepeat(repeat)
  return function addToGif(img) {
    counter++
    getPixels(path, (err, pixels) => {
      gif.setDelay(delay)
      gif.addFrame(pixels.data)
      gif.read()
      if (counter === images.length - 1) {
        gif.finish()
        return
      }
      addToGif(img)
    })
  }
}
