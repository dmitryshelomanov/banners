const debug = require('debug')('banner:compress-folder')
const fs = require('fs-extra')
const {
  tempPath,
  compressFolder,
} = require('../../helpers')
const {
  defaultQuality
} = require('../../config')


async function compressArchive(ctx) {
  const { body } = ctx.request
  debug(`compress folder with body -`, body)

  const { process, compress } = tempPath()

  await compressFolder(process(`3551856b30b846aad70e65b03cd53ea9--test.zip`), compress(`3551856b30b846aad70e65b03cd53ea9--test.zip`))
  let stat = await fs.stat(compress(`3551856b30b846aad70e65b03cd53ea9--test.zip`))
  ctx.body = {
    size: stat.size
  }
}

module.exports = (router, path) => router.get(
  path,
  compressArchive
)
