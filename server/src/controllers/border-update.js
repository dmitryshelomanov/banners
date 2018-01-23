const debug = require('debug')('banner:update-color-bg')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const UglifyJS = require('uglify-js')
const {
  types,
  tempPathGenerated,
  folderExists,
  bodyExists,
} = require('../utils')

const options = {
  output: {
    comments: true,
  },
}

function data(color, w, h, s) {
  const code = `
    /*service_function*/
    function serviceCallback(e){
      var canvas = document.getElementById('canvas');
      var oldW = 0;
      var oldH = 0;
      fireFunction(e);
      window.g = new createjs.Graphics();
      g.beginStroke('${color}').setStrokeStyle(${s}).drawRect(0, 0, ${w}, ${h});
      window.s = new createjs.Shape(window.g);exportRoot.addChild(window.s);
      exportRoot.addEventListener('tick', function() {
        if (oldW !== canvas.width) {
          window.s.graphics.command.w = canvas.width;
          window.s.graphics.command.h = canvas.height;
          oldW = canvas.width;
        }
      });
    }
    /*service_function_end*/
  `

  return UglifyJS.minify(code, options).code
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
  const { nameFolder, color, nameFile, w, h, s } = body
  const tmpPath = tempPathGenerated()

  debug('color change -', body)
  try {
    const $ = cheerio.load(await fs.readFile(tmpPath(types.PROCESS, `${nameFolder}/${nameFile}`)))

    $('script').each(function each() {
      if ($(this).attr('src') === undefined) {
        const str = replace(replaceOldCb($(this).html()))

        $(this)
          .html('')
          .text(`${UglifyJS.minify(str).code} ${data(color, w, h, s)}`)
      }
    })
    await fs.writeFile(tmpPath(types.PROCESS, `${nameFolder}/${nameFile}`), $.html())
    ctx.body = 'border color updated!'
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, uri) => router[method](
  uri,
  bodyExists(['nameFolder', 'color', 'nameFile', 'w', 'h', 's']),
  folderExists(types.PROCESS),
  updateBorder,
)
