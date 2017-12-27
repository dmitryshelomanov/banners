const debug = require('debug')('banner:helpers:cashe-deleted')
const fs = require('fs-extra')
const tempPath = require('../temp-path')


module.exports = async (nameFolder) => {
  debug('delete cahe with folder name - ', nameFolder)
  for (const pop in tempPath()) {
    const folder = tempPath()[pop](nameFolder)

    try {
      if (await fs.exists(folder)) {
        await fs.remove(folder)
      }
    }
    catch (error) {
      throw error
    }
  }
}
