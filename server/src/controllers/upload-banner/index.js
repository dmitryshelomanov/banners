const debug = require('debug')('banner:uploadBanner')
const fs = require('mz/fs')
const path = require('path')
const {
  isZipFile,
  notEmptyFile,
  maxSizeFile,
  uuid,
  decompress,
  folderTree,
  tempPath
} = require('../../helpers')


async function lastLoaded(ctx) {
  const { files } = ctx.request
  const { archive, decompose } = tempPath(files.archive.name)

  await fs.rename(files.archive.path, archive)
  await decompress(archive, decompose)
  ctx.body = await folderTree(decompose)
}

module.exports = (router, path) => router.post(
  path,
  notEmptyFile, maxSizeFile(3000), isZipFile, lastLoaded
)
