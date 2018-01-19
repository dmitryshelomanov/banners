const fs = require('fs-extra')
const compressArchive = require('../../utils/handlers/compress-folder')
const { types, tempPathGenerated } = require('../../utils/temp-path')


module.exports = async (Rules, areaPath, nameFolder) => {
  if (Rules === null) return true
  const path = tempPathGenerated()

  await compressArchive(areaPath, path(types.COMPRESS, nameFolder))
  const data = await fs.stat(path(types.COMPRESS, nameFolder))


  return Math.ceil(data.size / 1024) <= Number(Rules.content)
}
