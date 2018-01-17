const cheerio = require('cheerio')


module.exports = ({
  content,
}, html) => new Promise(async (res, rej) => {
  const $ = cheerio.load(html)

  try {
    $('script').each(function each() {
      const $script = $(this)

      if ($script.attr('src') && $script.attr('src').match(/libs/)) {
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
