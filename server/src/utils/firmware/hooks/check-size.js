const fs = require('fs-extra')
const compressArchive = require('../../../utils/handlers/compress-folder')
const { types, tempPathGenerated } = require('../../../utils/temp-path')
const { Rules } = require('../../../models')
const asyncMap = require('../mapper')
const getStubExtension = require('../get-stub-extension')

/**
 * Проверка размера архива
 * @param {*} param0
 */
const archiveSise = async ({ areaId, nameFolder }) => new Promise(async (res, rej) => {
  const size = await Rules.getCheckSizeArchive(areaId)
  const path = tempPathGenerated()

  if (!size) {
    return res(true)
  }
  await compressArchive(path(types.PROCESS, nameFolder), path(types.COMPRESS, nameFolder))
  const data = await fs.stat(path(types.COMPRESS, nameFolder))
  const rs = Math.ceil(data.size / 1024) <= Number(size.content)

  if (rs) {
    return res(true)
  }
  return rej({ status: 501, message: `архив весит больше чем ${size.content} кб` })
})

/**
 * Проверка размера jpg заглушки
 * @param {*} param0
 */
const stubSise = async ({ areaId, nameFolder, isGif }) => new Promise(async (res, rej) => {
  const size = await Rules.getCheckSizeStub(areaId)
  const path = tempPathGenerated()

  if (!size) {
    return res(true)
  }
  const data = await fs.stat(path(types.GIF_READY, `${nameFolder}/banner${getStubExtension(isGif)}`))
  const rs = Math.ceil(data.size / 1024) <= Number(size.content)

  if (rs) {
    return res(true)
  }
  return rej({ status: 501, message: `заглушка весит больше чем ${size.content} кб` })
})

module.exports = async function sizeStarter(body) {
  return asyncMap([archiveSise, stubSise], async (mapData) => {
    await mapData(body)
  }).catch((error) => {
    throw error
  })
}
