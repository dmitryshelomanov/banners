const getPixels = require('get-pixels')
const GIFEncoder = require('gif-encoder')
const fs = require('fs')
const debug = require('debug')('banner:helpers:gif-encoder')


module.exports = function wrapGif(imgData, pathReadyGif) {
  const { w, h, data, repeat } = imgData
  const gif = new GIFEncoder(w, h)
  const stream = fs.createWriteStream(pathReadyGif)
  let counter = 0

  gif.pipe(stream)
  gif.setQuality(20)
  gif.setDelay(0)
  gif.writeHeader()
  gif.setRepeat(repeat)
  return function addToGif(img) {
    debug('add to gif with counter - ', counter)

    getPixels(data[counter].path, (error, pixels) => {
      if (error) {
        throw error
      }
      gif.setDelay(data[counter].delay)
      gif.addFrame(pixels.data)
      gif.read()
      if (counter === data.length - 1) {
        gif.finish()
        return
      }
      counter++
      addToGif(img)
    })
  }
}
