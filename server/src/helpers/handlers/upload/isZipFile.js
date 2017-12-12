const debug = require('debug')('banner:helpers:upload:isZipFile')


const types = [
  'application/zip'
]

module.exports = async (ctx, next) => {
  const { files } = ctx.request
  
  debug(`change file types`, files.archive.type)
  if (types.indexOf(files.archive.type) === -1) { 
    ctx.status = 201
    ctx.body = 'file size mus be type (zip)'
    return
  }
  await next()
}
