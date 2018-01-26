const debug = require('debug')('banner:helpers:upload:isZipFile')


const types = [
  'application/zip',
  'application/x-zip-compressed',
]

module.exports = (ctx, next) => {
  const { files } = ctx.request

  debug(`change file types ${files.archive.type}`, files)
  if (types.indexOf(files.archive.type) === -1) {
    ctx.status = 201
    ctx.body = 'file size mus be type (zip)'
    return
  }
  return next()
}
