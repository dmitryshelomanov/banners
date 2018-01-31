const debug = require('debug')('banner:stopped-banner')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const { minify } = require('html-minifier')
const {
  bodyExists,
  tempPathGenerated,
  types,
} = require('../utils')
const { minifyOpt } = require('../config')


function setVarriable($, t, isStopped) {
  if ($('script[data-varriables="stopped"]').length > 0) {
    $('script[data-varriables="stopped"]').remove()
  }
  const varriable = `
    <script data-varriables='stopped'>
      var tv = ${t};
      var isStopped = ${isStopped};
    </script>
  `

  $('head').prepend(varriable)
}

function setServiceFunction($) {
  const code = `
    <script data-serviceFunction="stopped">
      function stopped() {
        if (!isStopped) return;
        setTimeout(function() {
          createjs.Ticker.removeAllEventListeners();
        }, tv)
      }
      if (typeof serviceCallback !== 'function' && isStopped) {
        stopped();
      }
    </script>
  `

  if ($('script[data-serviceFunction="stopped"]').length === 0) {
    $('body').append(code)
  }
}

async function stoppedBanner(ctx) {
  const { time, isStopped, nameFolder, nameFile, duration } = ctx.request.body
  const path = tempPathGenerated()
  const file = path(types.PROCESS, `${nameFolder}/${nameFile}`)

  debug('stoped banner with time', time)
  try {
    const $ = cheerio.load(await fs.readFile(file))

    setVarriable($, time + duration, isStopped)
    setServiceFunction($)
    await fs.writeFile(file, minify($.html(), minifyOpt))
    ctx.body = 'banner is stopped'
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, path) => router[method](
  path,
  bodyExists(['time', 'isStopped', 'nameFolder', 'nameFile', 'duration']),
  stoppedBanner,
)
