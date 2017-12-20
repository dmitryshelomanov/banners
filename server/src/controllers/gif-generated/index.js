const debug = require('debug')('banner:controller:gif-generated')
const fs = require('fs-extra')
const GIFEncoder = require('gifencoder')
const {
  tempPath,
} = require('../../helpers')


async function generatedGif(ctx) {
  const { name } = ctx.request.body
  const { gif } = tempPath()
  const encoder = new GIFEncoder(240, 400)
  let images = await fs.readdir(gif(`${name}`))

  encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'))
  images = images.map((item) => {
    const folder = `${name}/${item}`

    return `${gif(folder)}`
  })
  encoder.start()
  encoder.setRepeat(0)
  encoder.setDelay(500)
  encoder.setQuality(10)

  images.forEach((i) => {
    encoder.addFrame(i)
  })
  setTimeout(() => {
    encoder.finish()
  }, 2000)
  debug(`gif generated wirg name - ${name}`)
  ctx.status = 201
  ctx.body = gif(`${name}`)
}

module.exports = (router, url) => router.post(
  url,
  generatedGif
)
