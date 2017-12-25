const debug = require('debug')('banner:compress-folder')
const fs = require('fs-extra')
const {
  tempPath,
  compressFolder,
} = require('../helpers')

/**
 * Сжатие архива что бы узнать вес
 * @param {*} ctx
 */
async function compressArchive(ctx) {
  const { body } = ctx.request

  debug(`compress folder with body - ${body}`)

  const { process, compress } = tempPath()

  try {
    await compressFolder(process('3551856b30b846aad70e65b03cd53ea9--test.zip'), compress('3551856b30b846aad70e65b03cd53ea9--test.zip'))
    const stat = await fs.stat(compress('3551856b30b846aad70e65b03cd53ea9--test.zip'))

    ctx.body = { size: stat.size }
  }
  catch (error) {
    ctx.throw(error)
  }
}

module.exports = (router, uri) => router.get(
  uri,
  compressArchive
)
