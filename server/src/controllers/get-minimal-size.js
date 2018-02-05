const debug = require('debug')('banner:controller:get-minimal-size')
const cheerio = require('cheerio')
const fs = require('fs-extra')
const {
  types,
  tempPathGenerated,
  bodyExists,
} = require('../utils')

/**
 * Получить минимальный размер канваса
 * @param {*} ctx
 */
async function getMinimalSize(ctx) {
  const { body } = ctx.request
  const tmpPath = tempPathGenerated()
  const { nameFolder, nameFile } = body

  debug('get size with body', body)
  try {
    const $ = cheerio.load(await fs.readFile(tmpPath(types.PROCESS, `${nameFolder}/${nameFile}`)))
    const $canvas = $('canvas')

    ctx.body = {
      w: $canvas.attr('width'),
      h: $canvas.attr('height'),
    }
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, method, path) => router[method](
  path,
  bodyExists(['nameFolder', 'nameFile']),
  getMinimalSize,
)
