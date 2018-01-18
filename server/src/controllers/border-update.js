const debug = require('debug')('banner:update-color-bg')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const {
  tempPath,
  folderExists,
  bodyExists,
} = require('../utils')

const data = function data(color, w, h) {
  return `
    /*service_function*/
    function%serviceCallback(e){
      fireFunction(e);
      function%resize() {
        canvas = document.getElementById('canvas');
        window.s.graphics.command.w = canvas.width;
      };
      window.g = new%createjs.Graphics();
      g.beginStroke('${color}').setStrokeStyle(2).drawRect(0, 0, ${w}, ${h});
      window.s = new%createjs.Shape(window.g);exportRoot.addChild(window.s);
      window.onresize = resize;
      resize();
    }
    /*service_function_end*/
  `
    .replace(/\s+/igm, '')
    .replace(/%/igm, ' ')
}

const replace = function replaceFn(str) {
  let i = -1

  return str.trim().replace(/(handleComplete)+/ig, () => {
    i++
    return i === 0 ? 'serviceCallback' : 'fireFunction'
  })
}

const replaceOldCb = str => str.replace(/\/\*service_function\*\/(.+?)\/\*service_function_end\*\//igm, '')

/**
 * изменение границы в файле
 * замена существующей функции на свою
 * @param {*} ctx
 */
async function updateBorder(ctx) {
  const { body } = ctx.request
  const { nameFolder, color, nameFile, w, h } = body
  const { process } = tempPath()

  debug('color change -', body)
  try {
    const $ = cheerio.load(await fs.readFile(process(`${nameFolder}/${nameFile}`)))

    $('script').each(function each() {
      if ($(this).attr('src') === undefined) {
        const str = replace(replaceOldCb($(this).html()))

        $(this).html(`${str} ${data(color, w, h)}`)
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
  bodyExists(['nameFolder', 'color', 'nameFile', 'w', 'h']),
  folderExists(tempPath().process), updateBorder,
)
