const cheerio = require('cheerio')
const fs = require('fs-extra')
const { process } = require('../../temp-path')()
const types = require('../types')


module.exports = ({
  bind_element: element, position, content,
}, html) => new Promise(async (res, rej) => {
  const $ = cheerio.load(html)
  const $element = $(element)

  if ($element.length === 0) {
    return res({
      error: true,
      message: `element ${element} not found`,
      status: 404,
    })
  }
  const $oldElement = $element.clone()
  const $parent = $($element.parent())
  const $wrapper = $(content)

  $element.remove()
  $wrapper.html($oldElement)
  $('#body').prepend($wrapper)

  res($.html())
})
