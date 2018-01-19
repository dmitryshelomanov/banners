const cheerio = require('cheerio')
const debug = require('debug')('banner:firmware-util')
const fs = require('fs-extra')
const { Area, Rules } = require('../../models')
const { types, tempPathGenerated } = require('../temp-path')
const computed = require('./computed')
const asyncMap = require('./mapper')
const resolveFn = require('./resolve-fn')
const mapperFn = require('./mapper-fn')
const checkSize = require('./chek-size')


module.exports = async ({ nameFolder, areaId, fileName }) => {
  const rs = []
  const data = await Area.getAreaInfo(areaId)
  const path = tempPathGenerated()

  if (data === null) {
    throw new Error(`data not found with id ${areaId}`)
  }

  const oldPath = path(types.PROCESS, nameFolder)
  const areaPath = path(types.FIRMWARE, nameFolder, data.name)

  try {
    const $ = cheerio.load(await fs.readFile(path(types.PROCESS, `${nameFolder}/${fileName}`)))

    await fs.copy(oldPath, areaPath)

    for (let i = 0; i < data.rules.length; i++) {
      const hooks = computed(data.rules[i])

      if (hooks !== null) {
        debug(`push hook from ${data.rules[i].type}`)
        rs.push(hooks)
      }
    }

    return asyncMap(rs, mapperFn, $.html())
      .then(async (lastResolve) => {
        await resolveFn(lastResolve, data, areaPath, fileName)
        const size = await Rules.getCheckSizeRule(areaId)
        const sizeRs = await checkSize(size, areaPath, nameFolder)

        if (sizeRs) return true
        return {
          status: 500,
          message: 'size expected',
        }
      })
      .catch(error => error)
  }
  catch (error) {
    throw error
  }
}
