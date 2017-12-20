const fs = require('fs-extra')
const { tempPath } = require('./src/helpers')


async function convert(ctx) {
  const { body } = ctx.request
  const { process } = tempPath()
  const data = JSON.parse(body.data)

  try {
    data.forEach(async (i, k) => {
      const b = i.replace(/^data:image\/jpeg;base64,/, '')

      await fs.writeFile(process(`8b9a9c0bcfd045ef19e38861968cef3a--240x400.zip\\test\\${k}.jpeg`), b, 'base64')
    })
  }
  catch (error) {
    ctx.throw(error)
  }

  ctx.body = body.data.lenght
}

module.exports = (router, url) => router.get(
  url,
  convert
)
