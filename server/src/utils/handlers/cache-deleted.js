const debug = require('debug')('banner:helpers:cashe-deleted')
const fs = require('fs-extra')
const { types, tempPathGenerated } = require('../temp-path')


module.exports = async (nameFolder) => {
  debug('delete cahe with folder name - ', nameFolder)
  const path = tempPathGenerated()

  for (const pop in types) {
    const folder = path(types[pop], nameFolder)

    try {
      if (await fs.exists(folder)) {
        await fs.remove(folder)
        debug(`${pop} is deleted!`)
      }
    }
    catch (error) {
      debug(`${pop} not deleted!`, error)
      throw error
    }
  }
}
