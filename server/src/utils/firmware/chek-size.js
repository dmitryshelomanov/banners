const fs = require('fs-extra')
const compressArchive = require('../../utils/handlers/compress-folder')
const { compress } = require('../../utils/temp-path')()


module.exports = async (Rules, areaPath, nameFolder) => {
  if (Rules === null) return true

  await compressArchive(areaPath, compress(nameFolder))
  const data = await fs.stat(compress(nameFolder))


  return Math.ceil(data.size / 1024) <= Number(Rules.content)
}
