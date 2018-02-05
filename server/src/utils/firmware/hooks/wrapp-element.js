const cheerio = require('cheerio')

/**
 * Оборачивание элемента ссылкой
 * @param {*} param0
 * @param {*} html
 */
module.exports = ({
  bind_element: element, content,
}, html) => new Promise(async (res, rej) => {
  const $ = cheerio.load(html)
  const $element = $(element)

  if ($element.length === 0) {
    return rej({
      message: `element ${element} not found`,
      status: 404,
    })
  }
  const $oldElement = $element.clone()
  const $parent = $($element.parent())
  const $wrapper = $(content)

  if ($parent.is('a')) {
    $parent.attr('href', $wrapper.attr('href'))
    $parent.attr('target', $wrapper.attr('target'))
    return res($.html())
  }

  $element.remove()
  $wrapper.html($oldElement)
  $parent.prepend($wrapper)

  res($.html())
})
