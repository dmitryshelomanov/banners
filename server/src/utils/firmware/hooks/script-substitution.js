const cheerio = require('cheerio')

/**
 * удаление всех скриптов (из папки libs) и добавление глобальных
 * @param {*} param0
 * @param {*} html
 */
module.exports = ({
  content,
}, html) => new Promise(async (res, rej) => {
  const $ = cheerio.load(html)

  try {
    $('script').each(function each() {
      const $script = $(this)

      if ($script.attr('src') && ($script.attr('src').match(/libs/) || $script.attr('src').match(/http/))) {
        $script.remove()
      }
    })
    $('head').prepend(content)
    res($.html())
  }
  catch (error) {
    rej(error)
  }
})
