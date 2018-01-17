const debug = require('debug')('banner:update-color-bg')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const {
  tempPath,
  folderExists,
  bodyExists,
} = require('../utils')

const data = function data(color) {
  return `
    function serviceCallback(e){fireFunction(e);window.g = new createjs.Graphics();g.beginStroke('${color}').setStrokeStyle(2).drawRect(0, 0, 240, 400);window.s = new createjs.Shape(window.g);exportRoot.addChild(window.s)}
  `
}

const replace = function replaceFn(str) {
  let i = -1

  return str.trim().replace(/(handleComplete)+/ig, () => {
    i++
    return i === 0 ? 'serviceCallback' : 'fireFunction'
  })
}

const replaceOldCb = str => str.replace(/(function(.+)serviceCallback(.+)})/ig, '')

/**
 * изменение границы в файле
 * замена существующей функции на свою
 * @param {*} ctx
 */
async function updateBorder(ctx) {
  const { body } = ctx.request
  const { nameFolder, color, nameFile } = body
  const { process } = tempPath()

  debug('color change -', body)
  try {
    const $ = cheerio.load(await fs.readFile(process(`${nameFolder}/${nameFile}`)))

    $('script').each(function each() {
      if ($(this).attr('src') === undefined) {
        const str = replace(replaceOldCb($(this).html()))

        $(this).html(`${str} ${data(color)}`)
      }
    })
    await fs.writeFile(process(`${nameFolder}/${nameFile}`), $.html())
    ctx.body = 'border color updated!'
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  bodyExists(['nameFolder', 'color', 'nameFile']),
  folderExists(tempPath().process), updateBorder,
)
