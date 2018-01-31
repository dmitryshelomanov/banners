const debug = require('debug')('banner:update-color-bg')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const { minify } = require('html-minifier')
const {
  types,
  tempPathGenerated,
  folderExists,
  bodyExists,
} = require('../utils')
const { minifyOpt } = require('../config')


function setVarriable($, s, w, h, c) {
  if ($('script[data-varriables="setBorder"]').length > 0) {
    $('script[data-varriables="setBorder"]').remove()
  }
  const varriable = `
    <script data-varriables="setBorder">
      var sv = ${s}, wv = ${w}, hv = ${h}, cv = '${c}';
    </script>
  `

  $('head').prepend(varriable)
}

function setServiceFunction($) {
  const fn = `
    <script data-serviceFunction="setBorder">
        function serviceCallback(e){
        fireFunction(e);
        if (typeof stopped === 'function' && isStopped) {
          stopped();
        }
        var oldW = 0, oldH = 0;
        window.g = new createjs.Graphics();
        g.beginStroke(cv).setStrokeStyle(sv).drawRect(0, 0, wv, hv);
        window.s = new createjs.Shape(window.g);exportRoot.addChild(window.s);
        exportRoot.addEventListener('tick', function() {
        if (oldW !== canvas.width) {
          window.s.graphics.command.w = canvas.width;
          window.s.graphics.command.h = canvas.height;
          oldW = canvas.width;
        }
        });
      }
    </script>
  `

  if ($('script[data-serviceFunction="setBorder"]').length === 0) {
    $('body').append(fn)
  }
}

const replace = function replaceFn(str) {
  let i = -1

  return str.trim().replace(/(handleComplete)+/ig, () => {
    i++
    return i === 0 ? 'serviceCallback' : 'fireFunction'
  })
}

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
      const $this = $(this)

      if ($this.attr('src') === undefined
        && Object.keys($this.data()).length === 0) {
        const str = $this.html()

        $this.html('')
          .text(replace(str))
      }
    })
    setVarriable($, s, w, h, color)
    setServiceFunction($)
    await fs.writeFile(tmpPath(types.PROCESS, `${nameFolder}/${nameFile}`), minify($.html(), minifyOpt))
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
