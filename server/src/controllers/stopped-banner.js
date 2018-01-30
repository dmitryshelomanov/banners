const debug = require('debug')('banner:stopped-banner')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const UglifyJS = require('uglify-js')
const {
  bodyExists,
  tempPathGenerated,
  types,
} = require('../utils')


const options = {
  output: {
    comments: true,
  },
}

function boilerplate(time) {
  const code = `
    setTimeout(function() {
      createjs.Ticker.removeAllEventListeners();
    }, ${time})
  `

  return UglifyJS.minify(code, options).code
}

async function stoppedBanner(ctx) {
  const { time, duration, isStopped, nameFolder, nameFile } = ctx.request.body
  const path = tempPathGenerated()
  const file = path(types.PROCESS, `${nameFolder}/${nameFile}`)

  debug('stoped banner with time', time)
  try {
    const $ = cheerio.load(await fs.readFile(file))

    $('body').append(`<script>${boilerplate(time)}</script>`)
    await fs.writeFile(file, $.html())
    ctx.body = 'banner is stopped'
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, path) => router[method](
  path,
  bodyExists(['time', 'duration', 'isStopped', 'nameFolder', 'nameFile']),
  stoppedBanner,
)
