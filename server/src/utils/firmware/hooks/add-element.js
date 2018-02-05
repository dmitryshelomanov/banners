const cheerio = require('cheerio')
const types = require('../types')

/**
 * добавление данных
 * @param {*} param0
 * @param {*} html код архива. Передается между хуками по цепочки и модифицируется
 */
module.exports = ({
  bind_element: element, position, content,
}, html) => new Promise(async (res, rej) => {
  const $ = cheerio.load(html)
  const $element = $(element)

  if (element.length === 0) {
    return rej({
      message: `element ${element} not found`,
      status: 404,
    })
  }

  $element[types[position]](content)

  if ($('meta[name="ad.size"]').length !== 0) {
    const w = $('canvas').attr('width')
    const h = $('canvas').attr('height')

    $('meta[name="ad.size"]').attr('content', `width=${w},height=${h}`)
  }
  res($.html())
})
