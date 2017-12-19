const debug = require('debug')('banner:controller:parser-banner')
const fs = require('fs-extra')
const cheerio = require('cheerio')
const {
  tempPath,
} = require('../../helpers')

/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */

function parser(str) {
  const src = this.attr('src')

  if (/http.*/.test(src) || src == undefined) return

  this.attr('src', str)
}

async function parserBanner(ctx) {
  const { banner } = ctx.query

  debug('parser banner with query', banner)

  const { process } = tempPath()
  const pathBanner = process(`${banner}/240x400.html`)

  if (!await fs.exists(pathBanner)) {
    ctx.status = 204
    ctx.body = `file ${banner} not found in ${pathBanner}`
    return
  }

  const $ = cheerio.load(await fs.readFile(pathBanner))

  ctx.set('Content-type', 'text/plane')
  $('script').each(function each() {
    const $this = $(this)

    parser.call($this, `http://localhost:8000/process/${banner}/${$this.attr('src')}`)
  })

  ctx.body = $.html()
}

module.exports = (router, path) => router.get(
  path,
  parserBanner,
)
