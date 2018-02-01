const fs = require('fs-extra')
const {
  tempPathGenerated,
  types,
} = require('../temp-path')
const getStubExtension = require('./get-stub-extension')


module.exports = ({ isGif, nameFolder }) => new Promise(async (res, rej) => {
  const path = tempPathGenerated()
  const file = path(types.GIF_READY, `${nameFolder}/banner${getStubExtension(isGif)}`)

  if (await fs.exists(file)) {
    return res()
  }
  rej({ status: 404, message: 'заглушка не найдена' })
})
