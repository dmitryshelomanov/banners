const fs = require('fs-extra')
const debug = require('debug')('banner:helpers:copy-folder')


module.exports = async (input, output) => {
  debug(`copy folder from ${input} to ${output}`)
  try {
    await fs.copy(input, output)
  }
  catch (error) {
    throw error
  }
}
