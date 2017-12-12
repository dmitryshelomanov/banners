const debug = require('debug')('banner:uploadBanner')
const fs = require('mz/fs')
const path = require('path')
const {
  isZipFile,
  notEmptyFile,
  uuid,
  decompress,
  folderTree
} = require('../../helpers')

const tempPath = name => ({
  archive: path.resolve(__dirname, `..`, `..`, `..`, `tmp/archives/${uuid()}--${name}`),
  decompose: path.resolve(__dirname, `..`, `..`, `..`, `tmp/decompress/${uuid()}`)
})

async function lastLoaded(ctx) {
  const { files } = ctx.request
  const { archive, decompose } = tempPath(files.archive.name)
  await fs.rename(files.archive.path, archive)
  await decompress(archive, decompose)
  ctx.body = folderTree(decompose)
}

module.exports = (router, path) => router.post(
  path,
  notEmptyFile, isZipFile, lastLoaded
)
