const decompress = require('decompress')
const debug = require('debug')('banner:helpers:handlers:decompress')


module.exports = async (input, output) => {
  debug(`file ${input} decompress procces`)
  return await decompress(input, output)
}
