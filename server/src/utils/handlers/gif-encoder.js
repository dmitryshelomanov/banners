const getPixels = require('get-pixels')
const GIFEncoder = require('gifencoder')
const fs = require('fs')
const debug = require('debug')('banner:helpers:gif-encoder')


function replaceOriginalToGif(path) {
  return path.replace(/gif-original/, 'gif')
}

/**
 * генерация гифок
 * @param {*} imgData данные типа (data: путь к картинке, repeat: повторение)
 * @param {*} pathReadyGif куда положить готовую гифку
 */
module.exports = function wrapGif(imgData, pathReadyGif) {
  const { w, h, data, repeat } = imgData
  const gif = new GIFEncoder(w, h)
  let counter = 0

  gif
    .createReadStream()
    .pipe(fs.createWriteStream(pathReadyGif))

  gif.start()
  gif.setRepeat(repeat)
  gif.setQuality(10)
  gif.setDelay(0)

  return new Promise((res, rej) => {
    function addToGif() {
      debug('add to gif with counter - ', counter)

      getPixels(replaceOriginalToGif(data[counter].path), (error, pixels) => {
        if (error) return rej()
        gif.setDelay(data[counter].delay)
        gif.addFrame(pixels.data)
        if (counter === data.length - 1) {
          gif.finish()
          return res()
        }
        counter++
        addToGif()
      })
    }
    addToGif()
  })
}
