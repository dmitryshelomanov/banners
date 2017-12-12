const debug = require('debug')('banner:helpers:upload:notEmpty')


module.exports = async (ctx, next) => {
  const { files } = ctx.request

  debug(`change availability file`, !!files)
  if (!files.archive) {
    ctx.status = 404
    ctx.body = 'file not found'
  }
  await next()
}
