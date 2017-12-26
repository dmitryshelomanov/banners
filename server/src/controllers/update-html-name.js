const debug = require('debug')('banner:controller:update-html-name')
const fs = require('fs-extra')
const {
  tempPath,
} = require('../utils')

/**
 * генерация гиф
 * @param {*} ctx
 */
async function renameHtmlname(ctx) {
  const { body } = ctx.request
  const { process } = tempPath()
  const { newName, oldName, nameFolder } = body
  const oldPath = process(`${nameFolder}/${oldName}`)
  const newPath = process(`${nameFolder}/${newName}`)

  debug('update name html wile wit body', body)
  try {
    await fs.rename(oldPath, newPath)
    ctx.body = newName
  }
  catch (error) {
    ctx.throw(error)
    debug('error update name', error)
  }
}

module.exports = (router, method, url) => router[method](
  url,
  renameHtmlname
)
