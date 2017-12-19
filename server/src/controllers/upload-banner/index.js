const debug = require('debug')('banner:uploadBanner')
const fs = require('fs-extra')
const path = require('path')
const {
  isZipFile,
  notEmptyFile,
  maxSizeFile,
  decompress,
  folderTree,
  tempPath,
  copyFolder,
} = require('../../helpers')


async function lastLoaded(ctx) {
  const { files } = ctx.request
  const { archive, decompose, process } = tempPath(files.archive.name)

  debug(`upload banner with archive - ${files.archive.name}`)
  await fs.rename(files.archive.path, archive)
  await decompress(archive, decompose)
  await copyFolder(decompose, process())

  ctx.body = await folderTree(decompose)
}

module.exports = (router, uri) => router.post(
  uri,
  notEmptyFile, maxSizeFile(3000), isZipFile, lastLoaded
)
