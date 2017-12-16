const debug = require('debug')('banner:controller:parser-banner')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const { 
  tempPath
} = require('../../helpers')


function parser(str) {
  let src = this.attr('src')
  if (
    /http.*/.test(src) ||
    src == undefined
  ) return

  this.attr(`src`, str)
}

async function parserBanner(ctx) {
  const { banner } = ctx.query
  debug(`parser banner with query`, banner)

  const { process } = tempPath()
  let path = process(`${banner}\\240x400.html`)

  if (!await fs.exists(path)) {
    ctx.status = 404
    return ctx.body = `file ${banner} not found in ${path}`
  }

  let $ = cheerio.load(
    await fs.readFile(path)
  )

  ctx.set('Content-type', 'text/plane')
  $(`script`).each(function (e) {
    $this = $(this)
    parser.call($this, `http://localhost:8000/process/${banner}/${$this.attr('src')}`)
  })

  ctx.body = $.html()
}

module.exports = (router, path) => router.get(
  path,
  parserBanner
)