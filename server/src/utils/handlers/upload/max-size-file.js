const debug = require('debug')('banner:helpers:upload:maxSizeFile')


module.exports = size => async (ctx, next) => {
  const { files } = ctx.request

  debug(`check file sizes ${files.archive.size / 1024}`)
  if (files.archive.size > size * 1024) {
    ctx.status = 201
    ctx.body = `file weight more ${size}kb`
    return
  }
  return next()
}
