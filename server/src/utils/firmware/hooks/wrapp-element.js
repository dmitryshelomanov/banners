const cheerio = require('cheerio')


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

  $element.remove()
  $wrapper.html($oldElement)
  $parent.prepend($wrapper)

  res($.html())
})
